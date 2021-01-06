"use strict";

var validator = require('../helper_functions/Check_password_username');

var encryptor = require('../helper_functions/encrypt');

var authenticator = require('../models/authenticate.js');

var url = require('url');

var passport = require('passport');

var LocalStrategy = require("passport-local").Strategy; //let cs = require('../helper_functions/Session_ckeck')


exports.check_for_admin = function _callee(req, res) {
  var user, resolution, is_admin;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(authenticator.login_query(req, res));

        case 3:
          user = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(validator.login_validation(user, req));

        case 6:
          resolution = _context.sent;

          if (!resolution.isValidated) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(authenticator.check_for_role(user.rows[0]));

        case 10:
          is_admin = _context.sent;

          if (is_admin.rows[0] === undefined) {
            res.render('admin.pug', {
              message: "You are not authorized as an administrator."
            });
          } else if (is_admin.rows[0].user_role == 1) {
            req.session.user = user.rows[0].username;
            req.session.email = user.rows[0].email;
            req.session.valid = resolution.isValidated || false;
            req.session.logged_in_as_admin = true;
            req.session.cookie.maxAge = 1000 * 60 * 5;
            res.redirect('/admin');
          }

          _context.next = 15;
          break;

        case 14:
          //console.log(req.requestURL)
          res.render('admin.pug', {
            message: resolution.message
          });

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          error_message = {
            "name": _context.t0.name,
            "message": _context.t0.message
          }; //console.log(error_message)

          res.render('admin.pug', {
            message: _context.t0.message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.check_if_admin_auth_succesfull = function (req, res) {
  var auth_successfull;

  if (req.session.valid && req.session.logged_in_as_admin) {
    res.render('dashboard.pug');
  } else {
    res.redirect("/admin");
  }
};