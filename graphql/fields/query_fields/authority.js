const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const { authorityType } = require("../../types/index");
const Authority = require("../../../model/authority");

module.exports = {
  authorities: {
    type: new GraphQLList(authorityType),
    resolve: async function () {
      return await Authority.findAll();
    },
  },
  authority: {
    type: authorityType,
    args: {
      authority: { type: GraphQLID },
    },
    resolve: async function (args) {
      const { authority } = args;
      return await Authority.findOne({ where: { authority } });
    },
  },
};
