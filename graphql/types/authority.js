const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const authorityType= new GraphQLObjectType({
  name: "Authority",
  fields: {
    id: { type: GraphQLID },
    authority: { type: GraphQLString },
  },
});

module.exports = authorityType

