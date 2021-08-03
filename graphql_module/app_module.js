const { createApplication } = require("graphql-modules");

const userModule = require("./user_module/index");
const myModule = require("./auth_module/test");

const application = createApplication({
  modules: [myModule, userModule],
});

module.exports = application;
