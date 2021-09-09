const { gql } = require("graphql-modules");

module.exports = gql`
  input LoginInputType {
    username: String!
    password: String!
  }

  input InputUserType {
    username: String!
    password: String!
    email: String!
  }

  extend type Query {
    login(loginInput: LoginInputType): User
  }

  extend type Mutation {
    addUser(userInput: InputUserType): User
  }
`;
