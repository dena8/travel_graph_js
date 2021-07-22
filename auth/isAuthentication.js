const {errorName} = require('../error/graphql/error_constant');

module.exports = function isAuth(req) {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error(errorName.CREDENTIALS_ERROR);
    } else {
      return true;
    }
};