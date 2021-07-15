require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const customError = require("./error/custom_error");
const invalidCredentials = require("./error/invalid_user_or_password");
const Sentry = require('@sentry/node');
var path = require('path')
require('./config/mysql')

Sentry.init({ dsn: process.env.SENTRY_DNS});
app.use(Sentry.Handlers.requestHandler());


require("./config/express")(app);
require("./config/routes")(app);
require("./config/cloudinary");
require('./scheduling/shcedule')
require('./scheduling/clearLogs')



app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use(Sentry.Handlers.errorHandler());

app.use(function (err, req, res, next) {
  console.error(err.stack);

  if (err instanceof customError || err instanceof invalidCredentials) { 
    console.log("FROM GLOBAL");
    res.status(err.status).send({ message: err.message });
    return;
  }
  console.log(err);
  res.status(500).send({ message: "Something went wrong. Please try again.",err });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Error starting application");
  }
  console.log(`Travel agency app listening at http://localhost:${port}`);
});
