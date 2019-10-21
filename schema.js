const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Mutation {
    createTodo(input: TodoInput!): Todo
    updateTodo(id: ID!, input: TodoInput!): Todo
    deleteTodo(id: ID!): Boolean
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  type Query {
    getTodo(id: ID!): Todo
    getTodos: [Todo!]
    getUser(id: ID!): User
    getUsers: [User!]
  }

  input TodoInput {
    text: String!
    completed: Boolean
  }

  input UserInput {
    username: String!
    email: String!
    desc: String
    password: String!
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
    desc: String
    password: String!
  }
`;

module.exports = typeDefs;
