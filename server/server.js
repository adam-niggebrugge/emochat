const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { protect } = require("./middleware/auth21HW");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 3001;

async function startServer(typeDefs, resolvers, protect) {

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
