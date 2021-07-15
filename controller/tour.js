const cloudinary = require("cloudinary").v2;
const { Tour, Category, User } = require("../model/index");
const getCurrentUser = require("../util/currentUser");
const logger = require("../config/logger");

module.exports = {
  get: {
    async all(req, res) {
      const offset = Number(req.query.page); 
      
      const count = offset ? false : await Tour.findAndCountAll({ where: { enabled: true } });

      const tours = await Tour.findAndCountAll({
        where: { enabled: true },
        include: [
          { model: Category, as: "category" },
          { model: User, as: "creator" },
        ],
        limit: 9 || count.count,
        offset: (offset-1) * 9,
      });
      res.send(tours.rows);
    },
    async tourById(req, res) {
      const id = req.params.id;
      const tour = await Tour.findOne({
        where: { id },
        include: [
          { model: Category, as: "category" },
          { model: User, as: "creator" },
        ],
      });
      res.send(tour);
    },
  },
  post: {
    async createTour(req, res, next) {
      const {
        name,
        description,
        category,
        region,
        participants,
        difficultyLevel,
        price,
        startDate,
      } = req.body;
      console.log(startDate);

      const imageFile = req.files;
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

      console.log(tour);

      res.send({ tour });
    },
  },
  delete: {
    async tourById(req, res) {
      const id = req.params.id;
      const del = await Tour.destroy({ where: { id } });
      res.send({ massage: "deleted" });
    },
  },
  update: {
    async updateTour(req, res) {
      const {
        category,
        description,
        difficultyLevel,
        image,
        name,
        participants,
        price,
        region,
        startDate,
      } = req.body;

      if (typeof image === "string") {
        await Tour.update(
          {
            category,
            description,
            difficultyLevel,
            image,
            name,
            participants,
            price,
            region,
            startDate,
          },
          { where: { id: req.params.id } }
        );
      }
      //  disabled cloudinary while testing
      //  const imageFile = req.files;
      //  const tourImage = await cloudinary.uploader.upload(imageFile.image.path);
      const tourImage = {};
      tourImage.url =
        "https://www.voubs.bg/original/photo/270/Beautiful+nature_1d45a6ee858ebe41a190c539a8835234.jpg";

      await Tour.update(
        {
          category,
          description,
          difficultyLevel,
          image: tourImage.url,
          name,
          participants,
          price,
          region,
          startDate,
        },
        { where: { id: req.params.id } }
      );

      res.send({ message: "updated" });
    },
    async removeFromPortfolio(req, res) {
      const id = req.params.id;
      console.log(req.params.id);
      const del = await Tour.update({ enabled: false }, { where: { id } });
      res.send({ massage: "removed" });
    },
  },
};
