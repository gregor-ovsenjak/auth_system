"use strict";

var validator = require('../helper_functions/Check_password_username');

var encryptor = require('../helper_functions/encrypt');

var authenticator = require('../models/authenticate.js');

var registrator = require('../helper_functions/register');

var url = require('url');

var passport = require('passport');

var LocalStrategy = require("passport-local").Strategy;

exports.check_register = function _callee(req, res) {
  var register_query_results, password_strength;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(registrator.check_register_request(req, res));

        case 3:
          register_query_results = _context.sent;

          if (!register_query_results.valid) {
            _context.next = 18;
            break;
          }

          // checks for password strength
          password_strength = validator.check_password_strength(req.body.Password);

          if (!password_strength.satisfactory) {
            _context.next = 15;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(encryptor.cryptPassword(req.body.Password));

        case 9:
          req.body.Password = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(authenticator.register_query(req, res));

        case 12:
          res.redirect("/login");
          _context.next = 16;
          break;

        case 15:
          res.render('register.pug', {
            message: "Your password is too short."
          });

        case 16:
          _context.next = 19;
          break;

        case 18:
          res.render('register.pug', {
            message: register_query_results.message
          });

        case 19:
          _context.next = 26;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          error_message = {
            "name": _context.t0.name,
            "message": _context.t0.message
          };
          res.send(_context.t0.message);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.check_login = function _callee2(req, res) {
  var user, resolution;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(authenticator.login_query(req, res));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(validator.login_validation(user, req));

        case 6:
          resolution = _context2.sent;

          if (resolution.isValidated) {
            req.session.user = user.rows[0].username;
            req.session.email = user.rows[0].email;
            req.session.valid = resolution.isValidated || false;
            req.session.userID = req.session.id;
            req.session.logged_in_as_admin = false;
            res.redirect('/placeholder');
          } else {
            res.render('index.pug', {
              message: resolution.message
            });
          }

          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          error_message = {
            "name": _context2.t0.name,
            "message": _context2.t0.message
          };
          res.send(error_message);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.check_if_auth_succesfull = function (req, res) {
  var auth_successfull;

  if (req.session.valid === undefined) {
    auth_successfull = false;
  } else {
    auth_successfull = req.session.valid;
  }

  if (auth_successfull) {
    res.render('placeholder.pug', {
      username: req.session.user,
      email: req.session.email
    });
  } else {
    res.redirect("/login");
  }
};