const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const { tourType } = require("../../types/index");
const tour = require("../../types/tour");
const { Tour, Category, User } = require("../../../model/index");

module.exports = {
  tours: {
    type: new GraphQLList(tourType),
    resolve: async function () {
      const tours = await Tour.findAll({
        where: { enabled: true },
        include: [
          { model: Category, as: "category" },         
        ],
      });
      return tours;
    },
  },
  tour: {
    type: tourType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async function (root, args) {
      const { id } = args;
      const tour = await Tour.findOne({
        where: { id },
        include: [{ model: Category, as: "category" }],
      });

      return tour;
    },
  },
};
