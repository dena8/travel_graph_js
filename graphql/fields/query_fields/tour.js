const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const asyncHandler = require("express-async-handler");
const { isAuth, hasRole } = require("../../../auth/index");
const { errorName } = require("../../../error/graphql/error_constant");
const { tourType } = require("../../types/index");
const { Tour, Category, User } = require("../../../model/index");

module.exports = {
  tours: {
    type: new GraphQLList(tourType),
    resolve: asyncHandler(async function () {
      const tours = await Tour.findAll({
        where: { enabled: true },
        include: [{ model: Category, as: "category" }],
      });
      return tours;
    }),
  },
  tour: {
    type: tourType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: asyncHandler(async function ({ req }, args) {
      const { id } = args;
      isAuth(req);

      const tour = await Tour.findOne({
        where: { id },
        include: [{ model: Category, as: "category" }],
      });
      if (tour == null) {
        throw new Error(errorName.NOTFOUND);
      }
      return tour;
    }),
  },
};
