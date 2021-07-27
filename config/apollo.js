const { ApolloServer } = require("apollo-server-express");
const { GraphQLSchema } = require("graphql");
const queryType = require("../graphql/query_type");
const mutationType = require("../graphql/mutation_type");

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

module.exports = async (app) => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      authHeader: req.headers.authorization,
      req,
      res,
    }),
    customFormatErrorFn: (err) => {
      const error = getError(err.message);
      return { message: error.message, status: error.statusCode };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
};
