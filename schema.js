const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
type Mutation {
  register(input: UserInput!): User
  login(input: UserInput!): Token
}

type Query {
  getUsers: [User!]
}

input UserInput {
  email: String!
  password: String!
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
