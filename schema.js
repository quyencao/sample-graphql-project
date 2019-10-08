const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo!]
  }

  type Mutation {
    createTodo(text: String!): Todo!
  }
`;

module.exports = typeDefs;
