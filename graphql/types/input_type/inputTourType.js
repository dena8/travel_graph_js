const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLFloat
  } = require("graphql");

  module.exports = new GraphQLInputObjectType({
      name:'TourInput',
      fields:{
        name: { type: GraphQLString},
        category:{ type: GraphQLString},
        description: { type: GraphQLString},
        region: { type: GraphQLString},
        participants: { type: GraphQLInt},
        difficultyLevel: { type: GraphQLString},
        image: { type: GraphQLString},
        price: { type:GraphQLFloat },       
        startDate: { type: GraphQLString},
      }
  })

