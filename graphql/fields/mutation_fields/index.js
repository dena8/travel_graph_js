const userFields = require('./user');
const tourFields = require('./tour');
const categoryFields=require('./category');

const fields = Object.assign({},userFields,tourFields,categoryFields);

module.exports = fields;
