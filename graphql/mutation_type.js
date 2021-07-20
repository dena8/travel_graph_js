const {
    GraphQLObjectType,  
  } = require("graphql");
  
  const fields = require('./fields/mutation_fields/index');
  
  const mutationType = new GraphQLObjectType({
    name: "Mutation",
    fields,
  });
  
  module.exports = mutationType;