const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const userType = require("../../types/user");

const { User, Authority } = require("../../../model/index");

module.exports = {
  users: {
    type: new GraphQLList(userType),
    resolve: async function () {
      return await User.findAll({
        include: [{ model: Authority, as: "authority" }],
      });
    },
  },
  user: {
    type: userType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async function (source, args) {
      const { id } = args;
      return await User.findOne({
        where: { id },
        include: [{ model: Authority, as: "authority" }],
      });
    },
  },
};
