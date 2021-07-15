const Authority = require('../model/authority')
module.exports = ()=>{
    Authority.bulkCreate([
        {authority:'ADMIN_ROLE'},
        {authority:'GUIDE_ROLE'},
        {authority:'USER_ROLE'}
    ]);
}