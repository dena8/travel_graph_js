const {   
    GraphQLString,   
    GraphQLInputObjectType  
  } = require("graphql");

  module.exports= new GraphQLInputObjectType({
      name:'CategoryInput',
      fields:{
        name: { type: GraphQLString}
      }
  })