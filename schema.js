const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(text: String!): Boolean!
  }
`;

module.exports = typeDefs;
