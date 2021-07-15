const customError = require("../error/custom_error");
const asyncHandler = require("express-async-handler");

module.exports = function isAuth(truthy) {
  return asyncHandler((req, res, next) => {
    if (truthy) {
      next();
      return;
    }

    const token = req.header("Authorization");

    if (!token) {
      throw new customError("Unauthorized", 401);
    } else {
      next();
    }
  });
};
