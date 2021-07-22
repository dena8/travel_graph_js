const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const { isAuth, hasRole } = require("../../../auth/index");
const asyncHandler = require("express-async-handler");
const { categoryType } = require("../../types/index");
const inputCategoryType = require("../../types/input_type/inputCategoryType");
const Category = require("../../../model/category");

module.exports = {
  addCategory: {
    type: categoryType,
    args: {
      input: { type: inputCategoryType },
    },
    resolve: asyncHandler(async function ({ req }, args) {
      isAuth(req);
      await hasRole("GUIDE_ROLE", req);

      const { name } = args.input;
      const category = await Category.create({ name });
      return category;
    }),
  },
};
