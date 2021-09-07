
const { createModule } = require("graphql-modules");
const { User, UserResolver } = require("./user/index");
const { Authority, AuthorityResolver } = require("./authority/index");
const { isAuth, hasRole } = require("../../graphql_common/middleware/index");
const { authTypeDefs, authResolver } = require("./authentication/index");

const userModule = createModule({
  id: "user-module",
  typeDefs: [User, Authority, authTypeDefs],
  resolvers: [UserResolver, AuthorityResolver, authResolver], 
  middlewares: {
    Query: {
      users: [isAuth, hasRole("ADMIN_ROLE")],
      user: [isAuth],
      authorities: [isAuth],
    },
    Mutation: {
      updateAuthority: [isAuth, hasRole("ADMIN_ROLE")],
    },
  },
});

module.exports = userModule;
