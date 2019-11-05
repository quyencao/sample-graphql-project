const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
type Mutation {
  register(email: String!, password: String!): User!
  login(email: String!, password: String!): Token!
}

type Query {
  getUsers: [User!]
  getUser(email: String!): User!
  getLoginUser: User!
}

type Subscription {
  subscribe2message(topic: String!): Message!
}

type Message {
  message: String!
}

type Token {
  token: String!
}

type User {
  id: ID!
  email: String!
}
`;

module.exports = typeDefs;
