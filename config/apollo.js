const { ApolloServer } = require("apollo-server-express");

const application = require("../graphql_module/app_module");

const schema = application.createSchemaForApollo();

module.exports = async (app) => {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({ app });
};
