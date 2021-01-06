"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool();
/*

const users = async () => {
    try {
        const querryText = `CREATE TABLE IF NOT EXISTS user(
          userId SERIAL PRIMARY KEY,
          username VARCHAR(256) NOT NULL,
          password VARCHAR(256) NOT NULL,
          email VARCHAR(100) NOT NULL,
          createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(email)
        );`;
  
        result = await pool.query(querryText);
        console.log("succesfully created a table...");
    } catch(error) {
        console.log(error);
    }
  
}
  
users();
*/

exports.register_query = function _callee(req, res) {
  var new_user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          new_user = Object.values(req.body);
          console.log(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query('INSERT INTO users (username,password,email) VALUES ($1,$2,$3)', [new_user[1], new_user[2], new_user[0]]));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.login_query = function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM users WHERE email=$1;', [req.body.Email]));

        case 2:
          user = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(pool.query('UPDATE users SET login_time = NOW() WHERE email = $1', [req.body.Email]));

        case 5:
          return _context2.abrupt("return", user);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.check_for_role = function _callee3(user) {
  var is_admin;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM user_roles WHERE id=$1;', [user.userid]));

        case 2:
          is_admin = _context3.sent;
          return _context3.abrupt("return", is_admin);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.check_registration = function _callee4(req, res) {
  var new_user, check, is_email_used, Message;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          new_user = Object.values(req.body); //query to check if email is valid

          _context4.next = 3;
          return regeneratorRuntime.awrap(pool.query('SELECT (username,password,email) FROM users WHERE email = $1', [new_user[0]]));

        case 3:
          check = _context4.sent;
          // sets a true:false value based on the returned values of a query
          is_email_used = check.rowCount ? true : false; // Decides which message to return along with the is_email_used variable

          Message = is_email_used ? "A user with that email already exists." : "Email is available.";
          return _context4.abrupt("return", {
            valid: !is_email_used,
            message: Message
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.all_users = function _callee5() {
  var users;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(pool.query("SELECT userid AS ID,username,email,TO_CHAR(createdon,'YYYY-MM-DD') AS created_on FROM users ORDER BY createdon DESC LIMIT 20"));

        case 2:
          users = _context5.sent;
          return _context5.abrupt("return", users.rows);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.delete_recent_user = function _callee6(email) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(pool.query('DELETE FROM users WHERE email = $1', [email]));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.active_users = function _callee7() {
  var users;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(pool.query("SELECT TO_CHAR(login_time,'YYYY-MM-DD')AS lastlogin,username FROM users ORDER BY lastlogin DESC LIMIT 20"));

        case 2:
          users = _context7.sent;
          return _context7.abrupt("return", users.rows);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};