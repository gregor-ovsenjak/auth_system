"use strict";

exports.check_session = function (string) {
  return function _callee(req, res, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              if (req.session.valid === true) {
                //console.log(req.session.valid,req.session.logged_in_as_admin)
                //console.log(req.session||"black");
                next();
              } else {
                // console.log(false,"1")
                req.session.redirect = string;
                next();
              }
            } catch (error) {
              next(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.check_if_session_valid = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (req.session.valid === true && req.session.logged_in_as_admin === true) {
            console.log(1);
            res.redirect('/admin/dashboard');
          } else if (req.session.valid === true && req.session.logged_in_as_admin == false) {
            console.log(2);
            res.redirect('/placeholder');
          } else {
            console.log(3);
            console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
            res.render(req.session.redirect);
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.check_session_dashboard = function (string) {
  return function _callee3(req, res, next) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              if (req.session.valid === true) {
                console.log(req.session.valid);
                next();
              } else {
                console.log(req.session.valid);
                res.redirect("/admin");
              }
            } catch (error) {
              next(error);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};