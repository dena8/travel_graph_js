const { gql } = require("graphql-modules");

module.exports = gql`
  input loginInputType {
    username: String!
    password: String!
  }

  input InputUserType {
    username: String!
    password: String!
    email: String!
  }

  extend type Query {
    login(loginInput: loginInputType): User
  }

  extend type Mutation {
    addUser(userInput: InputUserType): User
  }
`;
