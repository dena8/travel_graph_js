const authorityFields = require('./authority');
const userFields = require('./user');

const fields = Object.assign({}, userFields,authorityFields);

module.exports=fields;