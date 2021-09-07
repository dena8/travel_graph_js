const { User, Authority, Tour } = require("../../../model/index");
const dateScalarType = require("../../../graphql_common/scalar_type/dateType");
const asyncHandler = require("express-async-handler");
const { orElse, NotFoundErr } = require("../../../graphql_common/error/index");


const userResolver = {
  Date: dateScalarType,
  Query: {
    users: async (root, args, context, info) => {
    
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
      return user || orElse(NotFoundErr, "User not found");
    },
  },
  Mutation: {
    updateAuthority: asyncHandler(async function (root, args, context, info) {
      const { authority, username } = args.authorityInput;
      const userAuthority =
        (await Authority.findOne({ where: { authority } })) || orElse(NotFoundErr, "Authority not found");

      const updated = await User.update(
        { authorityId: userAuthority.id },
        {
          where: { username },
        }
      );
      return !!updated[0];
    }),
  },
};

module.exports = userResolver;
