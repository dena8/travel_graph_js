require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return async function ({ root, args, context, info }, next) {
    const { authHeader } = context;
    const token = authHeader.slice(authHeader.indexOf(" ") + 1);
    const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);

    if (decodeToken.roles != role) {
      throw new Error("Not authorized");
    }
    return next();
  };
};
