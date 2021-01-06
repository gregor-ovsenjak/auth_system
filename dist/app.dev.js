"use strict";

var express = require("express");

var _require = require("inspector"),
    Session = _require.Session;

require("dotenv").config();

var methodOverride = require("method-override");

var path = require("path"); // routers


var authenticate_router = require("./routers/authenticate");

var admin_router = require("./routers/admin");

var passport = require("passport");

var flash = require("express-flash");

var session = require("express-session");

var cs = require('./helper_functions/Session_ckeck');

var dashboard_router = require("./routers/dashboard-router");

port = process.env.PORT;
var app = express();
app.use(express.urlencoded({
  extended: true
})); // for html forms

app.use(express.json()); // api clients 

app.use(express["static"](__dirname + '/public'));
app.use(flash());
app.use(methodOverride('_method'));
app.use(session({
  store: new (require('connect-pg-simple')(session))(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // routes for the website

app.use("/", authenticate_router);
app.use("/admin", admin_router);
app.listen(port, "localhost", function () {
  console.log("listening on port ".concat(port));
});