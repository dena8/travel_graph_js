const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
  } = require("graphql");
 
  
  const userInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: {    
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: GraphQLString },           
    },
  });


  module.exports = userInputType;