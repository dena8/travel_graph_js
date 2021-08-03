module.exports = function ({ root, args, context, info }, next) {
  const { authHeader } = context;

  if (!authHeader) {
    throw new Error("Please, logged in");
  } else {
    return next();
  }
};
