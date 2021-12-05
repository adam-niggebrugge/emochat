const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { protect } = require("./middleware/auth21HW");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;
const corsOptions ={
  origin: 'http:localhost:3001',
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

  apolloServer.applyMiddleware({ app });
  connectDB.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀🚀Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}  🚀🚀`);
    });
  });
}

startServer(typeDefs, resolvers, protect);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
