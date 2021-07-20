const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");

const authorityType = require("../types/authority");
const tourType = require("./tour");

module.exports=  new GraphQLObjectType({
    name: "User",  
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: GraphQLString },
      authority: { type: authorityType },
      cart: { type: GraphQLList(tourType) },
      createdAt: { type: GraphQLString },
    }),
  });


