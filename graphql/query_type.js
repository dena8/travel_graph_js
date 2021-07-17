const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = require("graphql");

const fields = require('./fields/query_fields/index');

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: fields,
});

module.exports = queryType;
