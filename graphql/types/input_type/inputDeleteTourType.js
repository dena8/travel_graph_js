const { 
    GraphQLID ,
    GraphQLInputObjectType  
  } = require("graphql");

  module.exports= new GraphQLInputObjectType({
      name:'DeleteTour',
      fields:{
        id: { type: GraphQLID}
      }
  })