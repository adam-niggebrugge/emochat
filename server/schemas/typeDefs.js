const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    pic: String
    isAdmin: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query{
    me: User
  }

  input UserInput{
    name: String!
    userId: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!, picture: String): Auth
  }
`;

module.exports = typeDefs;