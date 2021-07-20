const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat,
} = require("graphql");


const categoryType = require("./category");

module.exports = new GraphQLObjectType({
  name: "Tour",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: categoryType },
    region: { type: GraphQLString },
    participants: { type: GraphQLInt },
    difficultyLevel: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    enabled: { type: GraphQLBoolean },
    startDate: { type: GraphQLString },
    creatorId: {type: GraphQLID},
  }),
});
