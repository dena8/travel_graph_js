const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const asyncHandler = require('express-async-handler');
const { errorName } = require("../../../error/graphql/error_constant");
const { authorityType } = require("../../types/index");
const Authority = require("../../../model/authority");

module.exports = {
  authorities: {
    type: new GraphQLList(authorityType),
    resolve:asyncHandler(async function () {
      return await Authority.findAll();
    }),
  },
  authority: {
    type: authorityType,
    args: {
      authority: { type: GraphQLID },
    },
    resolve:asyncHandler( async function (args) {
      const { authority } = args;
      const authorityEntity = await Authority.findOne({ where: { authority } });

      if (authorityEntity == null) {
        throw new Error(errorName.NOTFOUND);
      }
      return authorityEntity;

    }),
  },
};
