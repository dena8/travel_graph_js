const { gql } = require("graphql-modules");

module.exports = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    password: String!
    email: String
    authority: Authority
    createdAt: Date
    updatedAt: Date
    cart:[Tour]! 
  }

  input updateAuthorityType {
    username: String!
    authority: String!
  }

  type Query {
    users: [User]!
    user(id: String): User
  }

  type Mutation {
    updateAuthority(authorityInput: updateAuthorityType): Boolean
  }
`;
