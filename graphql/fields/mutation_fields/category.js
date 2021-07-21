const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
  } = require("graphql");

  const asyncHandler = require('express-async-handler');
  const {categoryType} = require('../../types/index');
  const inputCategoryType = require('../../types/input_type/inputCategoryType');
  const Category = require('../../../model/category');


  module.exports = {
      addCategory:{
          type: categoryType,
          args:{
              input:{type:inputCategoryType}
          },
          resolve:asyncHandler(async function(root,args){
              const{name} = args.input;
              const category = await Category.create({ name });
              return category;             
          })
      }
      
  }
