"use strict";

var bcrypt = require('bcrypt');

exports.cryptPassword = function _callee(password) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 2:
          salt = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 5:
          hashedPassword = _context.sent;
          return _context.abrupt("return", hashedPassword);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.comparePassword = function _callee2(password, hashword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.compare(password, hashword));

        case 3:
          match = _context2.sent;
          return _context2.abrupt("return", match);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};