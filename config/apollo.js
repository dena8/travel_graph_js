const { ApolloServer } = require("apollo-server-express");
const { GraphQLSchema } = require("graphql");
const queryType = require("../graphql/query_type");
const mutationType = require("../graphql/mutation_type");
const { errorType } = require("./../error/graphql/error_constant");

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

module.exports = async (app) => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      authHeader: req.headers.authorization,
      req,
      res,
    }),
    formatError: (err) => {
      if (errorType[err.message]) {
        const error = errorType[err.message];
        return { message: error.message, status: error.statusCode };
      }
      return { message: err.message, extensions: err.extensions };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
};
