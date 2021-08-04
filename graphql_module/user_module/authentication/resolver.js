const asyncHandler = require("express-async-handler");
const { User, Authority } = require("../../../model/index");
const jwt = require("jsonwebtoken");
const {AuthenticationError}= require('apollo-server-core');
const initAuthorities = require('../../../util/initialAuthoritiesSetup');

module.exports = {
  Query: {
    login: asyncHandler(async function (root, args, context, info) {
      const { username, password } = args.loginInput;
      const user = await User.findOne({ where: { username } });

      if (user == null) {
        throw new AuthenticationError('Invalid credentials');
      }
      const comparePass = await User.comparePassword(password, user);
      if (!comparePass) {
        throw new AuthenticationError('Invalid credentials')
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
  Mutation: {
    addUser: async function (root, args, context, info) {
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
