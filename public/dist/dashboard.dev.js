"use strict";

var _redirection_handler = require("./helper_functions/redirection_handler.js");

var _admin_options = require("./helper_functions/admin_options.js");

window.addEventListener("load", function _callee2() {
  var buttons, _loop, i;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _redirection_handler.redirection_handler)('/admin/dashboard/table', {
            method: "GET"
          }, "formContent", _admin_options.tableCreate));

        case 2:
          //adding a delete option to buttons 
          buttons = document.getElementsByClassName("button");

          _loop = function _loop() {
            var button = buttons.item(i);
            button.addEventListener("click", function _callee(Event) {
              var data;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      Event.stopImmediatePropagation();
                      data = {
                        email: button.parentNode.parentNode.childNodes[2].textContent
                      };
                      _context.next = 4;
                      return regeneratorRuntime.awrap((0, _redirection_handler.redirection_handler)('/admin/dashboard/table/delete', {
                        method: "DELETE",
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      }, "black", _admin_options.log));

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          };

          for (i = 0; i < buttons.length; i++) {
            _loop();
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _redirection_handler.redirection_handler)('/admin/dashboard/active_users', {
            method: "GET"
          }, "lastLogin", _admin_options.tableCreate));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});