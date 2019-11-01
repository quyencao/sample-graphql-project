const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
type Mutation {
  register(input: RegisterUserInput!): User
}

type Query {
  getUsers: [User!]
}

input RegisterUserInput {
  email: String!
  password: String!
}

type User {
  id: ID!
  email: String!
}
`;

module.exports = typeDefs;
