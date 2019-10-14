const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    getTodo(id: ID!): Todo
    getTodos: [Todo!]
  }

  type Mutation {
    createTodo(text: String!): Todo
    deleteTodo(id: ID!): Boolean!
    updateTodo(id: ID!, text: String!, completed: Boolean): Todo
  }
`;

module.exports = typeDefs;
