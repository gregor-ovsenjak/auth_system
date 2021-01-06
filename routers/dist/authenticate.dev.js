"use strict";

var express = require('express');

var router = express.Router();

var register_controler = require('../controler/authenticate');

var cs = require('../helper_functions/Session_ckeck'); // GET methods 


router.get('/', function (req, res) {
  res.redirect('/login');
}); // prohibits to visit login,reigster page from placeholder if your session is valid

router.get('/login', cs.check_session('index.pug'), cs.check_if_session_valid);
router.get('/register', cs.check_session('register.pug'), cs.check_if_session_valid); // checks if authentication is succesfull

router.get('/placeholder', register_controler.check_if_auth_succesfull); //POST methods 

router.post("/register", register_controler.check_register);
router.post("/login", register_controler.check_login); // DELETE methods

router["delete"]('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
});
module.exports = router;