var express = require('express');
var admin_router = express.Router();
var admin_controler = require("../controler/admin-controler")
var dashboard_router = require("../routers/dashboard-router")
//console.log(req.protocol + '://' + req.get('host') + req.originalUrl); --> celoten url
let cs = require('../helper_functions/Session_ckeck')

admin_router.get('/',cs.check_session('admin.pug'),cs.check_if_session_valid);
admin_router.get('/dashboard',admin_controler.check_if_admin_auth_succesfull);
admin_router.use('/dashboard',cs.check_session_dashboard('admin.pug'),dashboard_router)
admin_router.post('/',admin_controler.check_for_admin);

module.exports = admin_router;