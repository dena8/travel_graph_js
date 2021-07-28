const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const Date = require('./scalar_type/dateType')

const authorityType = new GraphQLObjectType({
  name: "Authority",
  fields: {
    id: { type: GraphQLID },
    authority: { type: GraphQLString },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
});

module.exports = authorityType;
