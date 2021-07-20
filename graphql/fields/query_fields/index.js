const authorityFields = require('./authority');
const userFields = require('./user');
const tourFields = require('./tour');


const fields = Object.assign({}, userFields,authorityFields,tourFields);

module.exports=fields;