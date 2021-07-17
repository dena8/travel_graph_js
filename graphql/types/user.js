const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,    
  } = require("graphql");

  const authorityType = require('../types/authority')
  
  const userType = new GraphQLObjectType({
    name: "User",
    fields: {
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: GraphQLString },
      authority:{type:authorityType}      
    },
  });
  
  module.exports = userType;
  