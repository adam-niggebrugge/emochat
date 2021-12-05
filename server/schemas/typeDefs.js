const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    pic: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query{
    me: User
  }

  input UserInput{
    username: String!
    userId: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;