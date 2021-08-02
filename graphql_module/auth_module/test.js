

const { createModule } =require('graphql-modules');
const { gql } = require("graphql-modules");

 const myModule = createModule({
  id: 'my-module',
  typeDefs: [
   gql `extend type Query {
      hello: String!
    }`,
  ],
  resolvers: {
    Query: {
      hello: () =>'world',
    },
  },
});
module.exports = myModule