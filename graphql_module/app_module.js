const { createApplication } = require("graphql-modules");

const userModule = require("./user_module/index");

const application = createApplication({
  modules: [ userModule],
});

module.exports = application;
