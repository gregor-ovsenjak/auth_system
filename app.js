const express = require("express");
const { Session } = require("inspector");
require("dotenv").config();
const methodOverride = require("method-override");
const path = require("path");
// routers
const authenticate_router = require("./routers/authenticate");
const admin_router = require("./routers/admin")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
let cs = require('./helper_functions/Session_ckeck')
var dashboard_router = require("./routers/dashboard-router")
port = process.env.PORT;



const app = express();
app.use(express.urlencoded({extended: true})); // for html forms
app.use(express.json()); // api clients 
app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(methodOverride('_method'));
app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60*24},
}));


app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

 
// routes for the website
app.use("/",authenticate_router);
app.use("/admin",admin_router);


app.listen(port,"localhost", () => {
    console.log(`listening on port ${port}`);
    
})
