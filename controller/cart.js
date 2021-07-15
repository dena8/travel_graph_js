const { Tour, User, Order } = require("../model/index");
const customError = require("../error/custom_error");
const getCurrentUser = require("../util/currentUser");

module.exports = {
  get: {
    async checkIfTourIsAdded(req, res) {
      const id = req.params.id;     
      const hasTourInOrders = await Order.findOne({
        include: { model: Tour, as: "buyingProducts", where: { id } },
      }); 
      if(hasTourInOrders){
        res.send(true);
      }
      const hasTourInCart = await User.findOne({
        include:{model:Tour, as:'cart', where:{id}}
      })     
      res.send(hasTourInCart != null);      
    },
  },
  post: {
    async addTourToCart(req, res, next) {
      const tour = await Tour.findOne({ where: { id: req.params.id } });
      if (tour.participants < 1) {
        throw new customError("No vacant place", 401);
      }
      const user = await getCurrentUser(req);
      await user.addCart(tour);
      await Tour.update({participants:tour.participants-1},{where:{id: req.params.id}});
      res.send(user);
    },
    async createOrder(req, res) {
      const { username } = req.body;
      const user = await User.findOne({
        where: { username },
        include: { model: Tour, as: "cart" },
      });

      const order = await Order.create({
        buyDate: Date.now(),
        customer_id: user.id,
      });

      await order.addBuyingProducts(user.cart);
      await user.removeCart(user.cart);

      res.send(order);
    },
  },
  put: {
    async removeFromCart(req, res) {
      const tourId = req.query.tourId;
      const user = await getCurrentUser(req);
      const tour = await Tour.findOne({ where: { id: tourId } });
      await user.removeCart(tour);
      await Tour.update({participants:tour.participants+1},{where:{id: tourId}});
      res.send(user);
    },
  },
};
