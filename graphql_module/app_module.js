require('reflect-metadata');
const { createApplication } = require("graphql-modules");

const userModule = require("./user_module/index");
const tourModule = require('./tour_module/index');

const application = createApplication({
  modules: [ userModule,tourModule],  
});

module.exports = application;
