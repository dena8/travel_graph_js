const { User, Authority } = require("../model/index");
const jwt = require("jsonwebtoken");
const getCurrentUser = require("../util/currentUser");
const credentialsError = require("../error/invalid_user_or_password");
const applicationError = require("../error/custom_error");
const initAuthorities = require("../util/initialAuthoritiesSetup");

module.exports = {
  get: {
    async currentUser(req, res) {
      const user = await getCurrentUser(req);     
      res.send(user);
    },
    async authorities(req, res) {
      const authoritiesData = await Authority.findAll({
        attributes: ["authority"],
        raw: true,
      });
      const authorities = authoritiesData.map((x) => x.authority);
      res.send(authorities);
    },
    async checkIfUserExist(req, res) {
      const user = await User.findOne({
        where: { username: req.query.username },
      });
      res.send(user != null);
    },
  },
  post: {
    async register(req, res, next) {
      const { username, password, email } = req.body;

      const findByUsername = await User.findOne({ where: { username } });
      if (findByUsername != null) {
        throw new applicationError("Username is already in use.Try again!", 500);
      }

      if (await ((await Authority.count()) == 0)) {
        initAuthorities();
      }

      const authority =
        (await User.count()) < 1
          ? await Authority.findOne({ where: { Authority: "ADMIN_ROLE" } })
          : await Authority.findOne({ where: { Authority: "USER_ROLE" } });

      await User.create({
        username,
        password,
        email,
        authorityId: authority.id,
      });

      res.send({ massage: "created" });
    },
    async login(req, res, next) {
      const { username, password } = req.body;
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
      res.set('Access-Control-Expose-Headers',"Authorization")

     // console.log("Bearer ", token);
      res.send({ username});
    },
  },
  update: {
    async updateAuthority(req, res) {
      const { authority, username } = req.body;

      const userAuthority = await Authority.findOne({ where: { authority } });

      const user = await User.update(
        { authorityId: userAuthority.id },
        {
          where: { username },
        }
      );
      res.send(user);
    },
  },
};
