const { createModule } = require("graphql-modules");
const {Category,CategoryResolver} = require('./category/index');
const {Tour,TourResolver} = require('./tour/index');
const {isAuth,hasRole}=require('../../graphql_common/middleware/index');


const TourModule = createModule({
    id: "tour-module",
    typeDefs: [Category,Tour],
    resolvers:[CategoryResolver,TourResolver],
    middlewares:{
        Query:{tour:[isAuth]},
        Mutation:{
            categories:[isAuth,hasRole('GUIDE_ROLE')],
            category:[isAuth,hasRole('GUIDE_ROLE')],
            addTour:[isAuth,hasRole('GUIDE_ROLE')]            
        }
    }

});


module.exports= TourModule;