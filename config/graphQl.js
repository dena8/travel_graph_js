const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const queryType = require("../graphql/query_type");
const mutationType = require("../graphql/mutation_type");
const {categoryType,userType} =require('../graphql/types/index')

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType});

module.exports = (app) => {
  app.use( "/graphql",
    graphqlHTTP((req, res) => {
      return {
        schema: schema,
        graphiql: true,
        rootValue: {req, res },        
      };
    })
  );
};
