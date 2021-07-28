const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");


const asyncHandler = require('express-async-handler');
const { userType, authorityType } = require('../../types/index');
const {inputUserType,inputUpdateAuthorityType} = require('../../types/input_type/index');
const { User, Authority } = require('../../../model/index');
const initAuthorities = require('../../../util/initialAuthoritiesSetup');
const {isAuth,hasRole} =require('../../../auth/index');

module.exports = {
  addUser: {
    type: userType,
    args: {
      input: { type: inputUserType },
    },
    resolve:asyncHandler( async function (parent, args, context, info) {
      const { username, password, email } = args.input;
      if (await ((await Authority.count()) == 0)) {
        initAuthorities();
      }

      const authority =
        (await User.count()) < 1
          ? await Authority.findOne({ where: { Authority: "ADMIN_ROLE" } })
          : await Authority.findOne({ where: { Authority: "USER_ROLE" } });

      return await User.create({
        username,
        password,
        email,
        authorityId: authority.id,
      });
    }),
  },
  updateAuthority:{
    type: GraphQLBoolean,
    args:{
      input:{type: inputUpdateAuthorityType}
    },
    resolve:asyncHandler(async function (parent, args, context, info){
      isAuth(context.authHeader);   
      await hasRole('ADMIN_ROLE',context.authHeader);

      const {authority, username} = args.input;
      const userAuthority = await Authority.findOne({ where: { authority } });

      const updated = await User.update(
        { authorityId: userAuthority.id },
        {
          where: { username },
        }
      );     
      return !!updated;      
    })
  }
};


