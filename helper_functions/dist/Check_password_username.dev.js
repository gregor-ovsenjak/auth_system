"use strict";

var encryptor = require('../helper_functions/encrypt');

function ToValidate(validate, expr, bool) {
  validate.message = expr;
  validate.isValidated = bool;
  return validate;
}

exports.check_password_strength = function (password) {
  // checks password length 
  if (password.length < process.env.PASSWORD_LENGTH) {
    return {
      message: "Too short",
      satisfactory: false
    };
  } else {
    // checks minimum requirements for password security
    regex_checker = [/[A-Z]/, /[a-z]/, /\d/, /[!_.-]/];
    var sum = 0;
    regex_checker.forEach(function (ex) {
      sum += password.match(ex) ? 1 : 0;
    });

    switch (sum) {
      // returns descriptions of password strength
      case 1:
        return {
          message: "Weak",
          satisfactory: true
        };
        break;

      case 2:
        return {
          message: "Ok",
          satisfactory: true
        };
        break;

      case 3:
        return {
          message: "Strong",
          satisfactory: true
        };
        break;

      case 4:
        return {
          message: "Awesome",
          satisfactory: true
        };
        break;

      default:
        return {
          message: "Weird",
          satisfactory: false
        };
        break;
    }
  }
};

exports.login_validation = function _callee(user, req) {
  var validate, matching_passwords;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          validate = {
            isValidated: true,
            message: ""
          };

          if (!(user.rows.length == 0)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", ToValidate(validate, "Your email is wrong or you haven't registered yet.", false));

        case 5:
          Username = user.rows[0].username;
          hashPassword = user.rows[0].password;
          _context.next = 9;
          return regeneratorRuntime.awrap(encryptor.comparePassword(req.body.Password, hashPassword));

        case 9:
          matching_passwords = _context.sent;

          if (!(req.body.Username == Username && matching_passwords)) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", ToValidate(validate, "Hello ".concat(Username, ". You are logging in..."), true));

        case 14:
          if (!(req.body.Username != Username || matching_passwords)) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", ToValidate(validate, "Your password or your username are wrong.", false));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};