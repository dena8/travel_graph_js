require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Tour } = require("../model/index");


module.exports = async ( context) => {
  const { authHeader } = context;  
  const token = authHeader.slice(authHeader.indexOf(" ") + 1);
  const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET); 
  const user = await User.findOne(
    {
    where: { username: decodeToken.username },
    include:{model: Tour, as:'cart'},
  }); 
  return user;
};


