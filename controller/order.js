const { Tour, Category,User,Order } = require("../model/index");

module.exports={
    get:{
        async all(req,res){
        const orders= await Order.findAll();       
        res.send(orders);
        },
        async orderById(req,res){ 
            const order = await Order.findOne({where:{id:req.params.id},include:{model:Tour, as:'buyingProducts'}});
            res.send(order);
        }
        
    },    
}