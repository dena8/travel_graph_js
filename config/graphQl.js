
const { graphqlHTTP } = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const queryType = require('../graphql/query_type');
const mutationType = require('../graphql/mutation_type');

const schema = new GraphQLSchema({ query: queryType, mutation:mutationType });

module.exports = (app) => {
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
      }));   
  
  };