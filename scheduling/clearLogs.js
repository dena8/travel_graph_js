const fs = require("fs");
const cron = require("node-cron");
const logger = require("../config/logger");
const moment = require("moment");

module.exports = cron.schedule(" 00 00 * * *", () => {
  fs.writeFile("./logs/app.log", "", function (err) {
    if (err) {
      return logger.error(err);
    }
    logger.info(
      "In the beginning of the day clear all logs in app.log from last day %s.",
      moment().subtract(1, "days").toDate()
    );
  });
});
