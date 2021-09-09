const { Category, Tour } = require("../../../model/index");
const asyncHandler = require("express-async-handler");
const { orElse, NotFoundErr } = require("../../../graphql_common/error/index");
const getCurrentUser = require("../../../util/currentUser");

module.exports = {
  Query: {
    tours: asyncHandler(async function (root, args, context, info) {
      return await Tour.findAll();
    }),
    tour: asyncHandler(async function (root, { id }, context, info) {
      return (
        (await Tour.findOne({ where: { id } })) ||
        orElse(NotFoundErr, "Tour not found")
      );
    }),
  },
  Mutation: {
    addTour: asyncHandler(async function (root, args, context, info) {
      const {
        name,
        description,
        category,
        region,
        participants,
        difficultyLevel,
        image,
        price,
        startDate,
      } = args.tourInput;

      const categoryId = await Category.findOne({
        attributes: ["id"],
        where: { name: category },
      });

      const creator =await getCurrentUser(context);     

      return await Tour.create({
        name,
        description,
        region,
        participants,
        difficultyLevel,
        price,
        image,
        startDate,
        categoryId: categoryId.dataValues.id,
        creatorId: creator.id,
      });
    }),
    deleteTour: asyncHandler(async function (root, { id }, context, info) {
      return !!(await Tour.destroy({ where: { id } }));
    }),
  },
};
