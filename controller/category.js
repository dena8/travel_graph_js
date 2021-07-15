const Category = require("../model/category");

module.exports = {
  get: {
    async allCategories(req, res) {
      const categories = await Category.findAll();
      res.send(categories);
    },
  },
  post: {
    async createCategory(req, res) {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.send({ category });
    },
  },
};
