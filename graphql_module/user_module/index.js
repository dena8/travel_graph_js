const {createModule} = require('graphql-modules');
const {User,UserResolver} = require('./user/index');
const {Authority,AuthorityResolver} = require('./authority/index');

const userModule = createModule({
    id:'user-module',
    typeDefs: [User,Authority],
    resolvers: [UserResolver,AuthorityResolver],
});

module.exports = userModule;