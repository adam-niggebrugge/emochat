const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require("./config/connection");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMid");

const __dirname1 = path.resolve();

dotenv.config();

const { typeDefs, resolvers } = require('./schemas');
const { protect } = require("./middleware/auth21HW");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;
// const PORT2 = process.env.PORT || 3005;

const httpServer = http.createServer(app);

const corsOptions ={
  origin: 'http:localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

async function startServer(typeDefs, resolvers, protect) {
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: protect,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app  });

  connectDB.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀🚀Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}  🚀🚀`);
    });
  });
  return apolloServer;
}

startServer(typeDefs, resolvers, protect);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(cors(corsOptions));


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

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
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