const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
type Mutation {
  createTodo(input: CreateTodoInput!): Todo
  updateTodo(id: ID!, input: UpdateTodoInput!): Todo
  deleteTodo(id: ID!): Boolean
  createUser(input: CreateUserInput!): User
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): Boolean
}

type Query {
  getTodo(id: ID!): Todo
  getTodos: [Todo!]
  getUser(id: ID!): User
  getUsers: [User!]
}

input CreateTodoInput {
  text: String!
  completed: Boolean
}

input UpdateTodoInput {
  text: String
  completed: Boolean
}
input CreateUserInput {
  username: String!
  email: String!
}

input UpdateUserInput {
  username: String
  email: String
}

type Todo {
  id: ID!
  text: String!
  completed: Boolean
}
type User {
  id: ID!
  username: String!
  email: String!
}
`;

module.exports = typeDefs;
