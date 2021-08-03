const { User, Authority } = require("../../../model/index");
const initAuthorities = require("../../../util/initialAuthoritiesSetup");
const dateScalarType = require("../../scalar_type/dateType");
const asyncHandler = require("express-async-handler");

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
    updateAuthority: asyncHandler(async function (root, args, context, info) {
      const { authority, username } = args.authorityInput;
      const userAuthority = await Authority.findOne({ where: { authority } });

      const updated = await User.update(
        { authorityId: userAuthority.id },
        {
          where: { username },
        }
      );
      return !!updated;
    }),
  },
};

module.exports = userResolver;
