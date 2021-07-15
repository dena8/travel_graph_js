const cron = require("node-cron");
const Tour = require("../model/tour");
const { Op } = require("sequelize");
const moment = require('moment');
const logger = require('../config/logger')



module.exports= cron.schedule(" 30 10 * * *", async () => {

  await Tour.update(
    {
      participants: 0,
      enabled: false,
    },
    {
      where: {
        startDate: moment().add(2, 'days').toDate(),
        enabled: true,
        participants: {
          [Op.gt]: 0,
        },
      },
    }
  );

 
  logger.info(
    "Every day in 10:30 AM for every tour, which start after day and have vacant place, setting participants to zero and remove from tour portfolio"
  );
})




