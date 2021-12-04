const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { protect } = require("./middleware/authorizationMid");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMid");

const __dirname1 = path.resolve();

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3011;

let apolloServer = null;

async function startServer(typeDefs, resolvers, protect) {

  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: protect,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ 
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/' 
  });

  connectDB.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}  🚀`);
    });
  });
}

startServer(typeDefs, resolvers, protect);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, "/public/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "public", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(notFound);
app.use(errorHandler);

const io = require("socket.io")(apolloServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
