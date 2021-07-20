const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const userType = require("../../types/user");

const { User, Authority, Tour } = require("../../../model/index");
const jwt = require("jsonwebtoken");

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
    resolve: async function (root, args, context) {
      const { id } = args;       

      return await User.findOne({
        where: { id },
        include: [{ model: Authority, as: "authority" },{model: Tour, as: "cart"}],
      });
    },
  },
  login: {
    type: userType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async function ({ res }, args) {
      const { username, password } = args;
      console.log(username, password);
      const user = await User.findOne({ where: { username } });
      console.log(user);

      if (user == null) {
        throw new credentialsError("Invalid credentials", 500);
      }
      const comparePass = await User.comparePassword(password, user);
      if (!comparePass) {
        throw new credentialsError("Invalid credentials", 500);
      }

      const userAuthority = await Authority.findOne({
        where: { id: user.authorityId },
      });
      const authority = userAuthority.authority;
      const token = await jwt.sign(
        { username, roles: authority },
        process.env.TOKEN_SECRET
      );
      res.set("Authorization", token);
      res.set("Access-Control-Expose-Headers", "Authorization");
      // console.log("Bearer ", token);
      return user;
    },
  },
};
