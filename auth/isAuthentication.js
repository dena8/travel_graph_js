const { errorName } = require("../error/graphql/error_constant");

module.exports = function isAuth(authHeader) {
  if (!authHeader) {
    throw new Error(errorName.CREDENTIALS_ERROR);
  } else {
    return true;
  }
};
