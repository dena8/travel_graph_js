const { createModule } = require("graphql-modules");
const {Category,CategoryResolver} = require('./category/index');
const {isAuth,hasRole}=require('../../graphql_common/middleware/index');

const TourModule = createModule({
    id: "tour-module",
    typeDefs: [Category],
    resolvers:[CategoryResolver],
    middlewares:{
        Query:{},
        Mutation:{
            categories:[isAuth,hasRole('GUIDE_ROLE')],
            category:[isAuth,hasRole('GUIDE_ROLE')]            
        }
    }

});


module.exports= TourModule;