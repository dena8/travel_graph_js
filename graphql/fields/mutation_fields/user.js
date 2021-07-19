const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = require("graphql");

const { userType, authorityType } = require('../../types/index');
const userInputType = require('../../types/input_type/inputUserType');
const { User, Authority } = require('../../../model/index');
const initAuthorities = require('../../../util/initialAuthoritiesSetup');

module.exports = {
  addUser: {
    type: userType,
    args: {
      input: { type: userInputType },
    },
    resolve: async function (source, args) {
      const { username, password, email } = args.input;
      if (await ((await Authority.count()) == 0)) {
        initAuthorities();
      }

      const authority =
        (await User.count()) < 1
          ? await Authority.findOne({ where: { Authority: "ADMIN_ROLE" } })
          : await Authority.findOne({ where: { Authority: "USER_ROLE" } });

      return await User.create({
        username,
        password,
        email,
        authorityId: authority.id,
      });
    },
  },
};


