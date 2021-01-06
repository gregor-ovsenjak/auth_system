"use strict";

var query = require('../models/authenticate.js');

var express = require('express');

var dashboard_router = express.Router({
  mergeParams: true
});

var Misc = require('../helper_functions/Miscallaneous.js');

dashboard_router.get('/table', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(query.all_users());

        case 2:
          users = _context.sent;
          res.send(users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
dashboard_router["delete"]('/table/delete', function _callee2(req, res) {
  var email;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email;
          _context2.next = 3;
          return regeneratorRuntime.awrap(query.delete_recent_user(email));

        case 3:
          res.send({
            email: email
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
dashboard_router.get('/active_users', function _callee3(req, res) {
  var new_active_users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(query.active_users());

        case 2:
          active_users = _context3.sent;
          new_active_users = Misc.returnLastLogin(active_users);
          res.send(new_active_users);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = dashboard_router;