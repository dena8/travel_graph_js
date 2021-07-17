const logger = require("../config/logger");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const { User } = require("../model/index");

const userType = require("./type");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async function () {
        return await User.findAll();
      },
    },
  },
});

module.exports = queryType;
