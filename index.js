const express = require("express");
const routes = require("./router/routes");
const mongoose = require("mongoose");
const { mongodb } = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportSetup = require("./config/passport");

const app = express();
const port = 3000;
const dbURL = mongodb.dbURL; // database url(mongodb atlas)

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// hospital-api routes
app.use(routes);

// mongoose connection
mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port);
    console.log("Connected to database and server is listening on port", port);
  })
  .catch((err) => {
    console.log("There is some error is connecting with database", err);
  });
