const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");

const { isAuth, hasRole } = require("../../../auth/index");
const tourType = require("../../types/tour");
const inputTourType = require("../../types/input_type/inputTourType");

const cloudinary = require("cloudinary").v2;
const {Tour,Category} =require('../../../model/index');
const getCurrentUser = require('../../../util/currentUser');
const inputDeleteTourType = require('../../types/input_type/inputDeleteTourType');
const {errorName} =require('../../../error/graphql/error_constant');
const asyncHandler = require('express-async-handler');

module.exports = {
  addTour: {
    type: tourType,
    args: {
      input: { type: inputTourType },
    },
    resolve:asyncHandler( async function ({req},args) {
      isAuth(req);   
      await hasRole('GUIDE_ROLE',req);

      const {
        name,
        description,
        category,
        region,
        participants,
        difficultyLevel,
        price,
        startDate,
      } = args.input;

      const categoryId = await Category.findOne({
        attributes: ["id"],
        where: { name: category },
      });   

      const currentUserId = (await getCurrentUser(req)).id;      

       // disabled cloudinary while testing
      //  const tourImage = await cloudinary.uploader.upload(imageFile.image.path);
      const tourImage = {};
      tourImage.url =
        "https://www.voubs.bg/original/photo/270/Beautiful+nature_1d45a6ee858ebe41a190c539a8835234.jpg";

        const tour = await Tour.create({
            name,
            description,
            region,
            participants,
            difficultyLevel,
            price,
            image: tourImage.url,
            startDate,
            categoryId: categoryId.dataValues.id,
            creatorId: currentUserId,            
          });
          return tour;
    }),
    
  },
  deleteTour:{
    type:GraphQLBoolean,
    args:{
      input:{type:inputDeleteTourType}
    },
    resolve:asyncHandler( async function({req},args){
      isAuth(req);   
      await hasRole('ADMIN_ROLE',req);
      
      const {id} = args.input;
      const tour= await Tour.destroy({ where: { id } });     
      return !!tour;
    })
  }
};
