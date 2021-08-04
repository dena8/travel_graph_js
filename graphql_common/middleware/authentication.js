const {AuthenticationError}= require('apollo-server-core');

module.exports = function ({ root, args, context, info }, next) {
  const { authHeader } = context;

  if (!authHeader) {
    throw new AuthenticationError('Invalid credentials');
  } else {
    return next();
  }
};
