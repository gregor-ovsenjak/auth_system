"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirection_handler = redirection_handler;

// this piece of code handles a response
// if response is a redirection --> redirects to another URL specified in the server code
// if response is something else --> a callback function is used to work on response data
function redirection_handler(url, method, params, callback) {
  var response;
  return regeneratorRuntime.async(function redirection_handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url, method));

        case 2:
          response = _context.sent;

          if (!response.redirected) {
            _context.next = 7;
            break;
          }

          window.location.href = response.url;
          _context.next = 13;
          break;

        case 7:
          _context.t0 = callback;
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          _context.t1 = _context.sent;
          _context.t2 = [params];

          _context.t0.apply.call(_context.t0, _context.t1, _context.t2);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}