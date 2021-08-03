const { Authority } = require("../../../model/index");

module.exports = {
  Query: {
    authorities: async () => {
      return await Authority.findAll();
    },
  },
};
