const { User, Authority } = require("../../../model/index");
const initAuthorities = require("../../../util/initialAuthoritiesSetup");
const dateScalarType = require("../../scalar_type/dateType");

const userResolver = {
  Date: dateScalarType,
  Query: {
    users: async () => {
      return await User.findAll({
        include: [{ model: Authority, as: "authority" }],
      });
    },
    user: async (root, { id }, context, info) => {
      const user = await User.findOne({
        where: { id },
        include: [
          { model: Authority, as: "authority" },
          { model: Tour, as: "cart" },
        ],
      });
      return user;
    },
  },
  Mutation: {
    addUser: async function (parent, args, context, info) {
      const { username, password, email } = args.userInput;
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

module.exports = userResolver;
