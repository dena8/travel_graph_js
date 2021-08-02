const { gql } = require("graphql-modules");

module.exports = gql`
  type Authority {
    id: ID
    authority: String
  }

  extend type Query {
    authorities: [Authority]
    authority(id: ID): Authority
  }
`;
