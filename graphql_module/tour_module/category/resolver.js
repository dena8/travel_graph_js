const { Category } = require("../../../model/index");
const asyncHandler = require("express-async-handler");
const dateScalarType = require("../../../graphql_common/scalar_type/dateType");
const { orElse, NotFoundErr } = require("../../../graphql_common/error/index");

module.exports = {
  Date: dateScalarType,
  Query: {
    categories: asyncHandler(async function (root, args, context, info) {
      return await Category.findAll();
    }),
    category: asyncHandler(async function (root, { id }, context, info) {
      return (
        (await Category.findOne({ where: { id } })) ||
        orElse(NotFoundErr, "Category not found")
      );
    }),
  },
  Mutation: {
    addCategory: asyncHandler(async function (root, args, context, info) {
      const { name } = args.categoryInput;
      return await Category.create({
        name,
      });
    }),
  },
};
