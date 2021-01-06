"use strict";

register_controler = require('../models/authenticate');
validator = require("../helper_functions/Miscallaneous");

exports.check_register_request = function _callee(req, res) {
  var email, is_registered;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //regex check for email validity
          email = validator.validateEmail(req.body.Email); // puts values to the is_registered variable

          if (!email) {
            _context.next = 8;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(register_controler.check_registration(req, res));

        case 5:
          _context.t0 = _context.sent;
          _context.next = 9;
          break;

        case 8:
          _context.t0 = {
            valid: false,
            message: "Your email is not valid."
          };

        case 9:
          is_registered = _context.t0;
          return _context.abrupt("return", is_registered);

        case 13:
          _context.prev = 13;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1.message);
          error_message = {
            "name": _context.t1.name,
            "message": _context.t1.message
          };
          res.send(_context.t1.message);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};