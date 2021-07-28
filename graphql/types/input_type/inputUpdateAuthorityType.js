const { GraphQLString, GraphQLInputObjectType } = require("graphql");

module.exports = new GraphQLInputObjectType({
  name: "UpdateAuthority",
  fields: {
    authority: { type: GraphQLString },
    username: { type: GraphQLString },
  },
});
