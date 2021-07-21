const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const queryType = require("../graphql/query_type");
const mutationType = require("../graphql/mutation_type");

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

const { errorType } = require("../error/graphql/error_constant");
const getError = (errorName) => {
  return errorType[errorName];
};

module.exports = (app) => {
  app.use(
    "/graphql",
    graphqlHTTP((req, res) => {
      return {
        schema: schema,
        graphiql: true,
        rootValue: { req, res },
        customFormatErrorFn: (err) => {
          const error = getError(err.message);
          return { message: error.message, status: error.statusCode };
        },
      };
    })
  );
};
