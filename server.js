
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const Sentry = require("@sentry/node");
require("./config/mysql");

Sentry.init({ dsn: process.env.SENTRY_DNS });
app.use(Sentry.Handlers.requestHandler());

require("./config/express")(app);
require("./config/cloudinary");
require("./scheduling/shcedule");
require("./scheduling/clearLogs");

require("./config/apollo")(app);


app.use(Sentry.Handlers.errorHandler());

app.use(function (err, req, res, next) {
  res
    .status(500)
    .send({ message: "Something went wrong. Please try again.", err });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Error starting application");
  }
  console.log(`Travel agency app listening at http://localhost:${port}`);
});
