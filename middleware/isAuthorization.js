require("dotenv").config();
const jwt = require("jsonwebtoken");
const customError = require("../error/custom_error");
const asyncHandler = require("express-async-handler");

module.exports = function hasRole(role) {
  return asyncHandler(async (req, res, next) => {
    const tokenHeader = req.header("Authorization");
    const token = tokenHeader.slice(tokenHeader.indexOf(" ") + 1);

    const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);

    if (decodeToken.roles != role) {
      throw new customError("Unauthorized", 401);
    }
    next();
  });
};
