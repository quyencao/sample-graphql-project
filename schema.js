const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
type Mutation {
  register(email: String!, password: String!): User!
  login(email: String!, password: String!): Token!
}

type Query {
  getUsers: [User!]
  getUser(email: String!): User!
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
