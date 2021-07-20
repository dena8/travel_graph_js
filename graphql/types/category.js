const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,    
  } = require("graphql");



  module.exports= new GraphQLObjectType({
      name:'Category',
      fields:()=>({
        id: {type:GraphQLID},
        name: { type: GraphQLString}
      })
  })