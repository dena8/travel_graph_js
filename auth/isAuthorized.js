require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {errorName} = require('../error/graphql/error_constant');

module.exports = asyncHandler(async function hasRole(role, req) {
  const tokenHeader = req.header("Authorization");
  const token = tokenHeader.slice(tokenHeader.indexOf(" ") + 1);

  const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);

  if (decodeToken.roles != role) {
        throw new Error(errorName.UNAUTHORIZED);    
  }
  return true;
});