const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const { isAuth, hasRole } = require("../../../auth/index");
const asyncHandler = require("express-async-handler");
const { errorName } = require("../../../error/graphql/error_constant");
const userType = require("../../types/user");
const { User, Authority, Tour } = require("../../../model/index");
const jwt = require("jsonwebtoken");

module.exports = {
  users: {
    type: new GraphQLList(userType),
    resolve: asyncHandler(async function (parent, args, context, info) {
      isAuth(context.authHeader);
      await hasRole("ADMIN_ROLE", context.authHeader);
      return await User.findAll({
        include: [{ model: Authority, as: "authority" }],
      });
    }),
  },
  user: {
    type: userType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: asyncHandler(async function (parent, args, context, info) {
      isAuth(context.authHeader);
      const { id } = args;
      const user = await User.findOne({
        where: { id },
        include: [
          { model: Authority, as: "authority" },
          { model: Tour, as: "cart" },
        ],
      });

      if (user == null) {
        throw new Error(errorName.NOTFOUND);
      }

      return user;
    }),
  },
  login: {
    type: userType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: asyncHandler(async function (parent, args, context, info) {
      const { username, password } = args;
      const user = await User.findOne({ where: { username } });

      if (user == null) {
        throw new Error(errorName.CREDENTIALS_ERROR);
      }
      const comparePass = await User.comparePassword(password, user);
      if (!comparePass) {
        throw new Error(errorName.CREDENTIALS_ERROR);
      }

      const userAuthority = await Authority.findOne({
        where: { id: user.authorityId },
      });
      const authority = userAuthority.authority;
      const token = await jwt.sign(
        { username, roles: authority },
        process.env.TOKEN_SECRET
      );
      context.res.set("Authorization", token);
      context.res.set("Access-Control-Expose-Headers", "Authorization");
      console.log("Bearer ", token);
      return user;
    }),
  },
};
