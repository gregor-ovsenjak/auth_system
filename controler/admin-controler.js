let validator = require('../helper_functions/Check_password_username');
let encryptor = require('../helper_functions/encrypt');
let authenticator = require('../models/authenticate.js');
const url = require('url'); 
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
//let cs = require('../helper_functions/Session_ckeck')

exports.check_for_admin =  async(req,res) => {

    try {
        let user = await authenticator.login_query(req,res);
        let resolution = await validator.login_validation(user,req) ;
        
        if (resolution.isValidated ){
            let is_admin = await authenticator.check_for_role(user.rows[0]);
            if (is_admin.rows[0] === undefined){
                res.render('admin.pug',{message:"You are not authorized as an administrator."});
            }else if ((is_admin.rows[0].user_role == 1)){
                req.session.user = user.rows[0].username;
                req.session.email = user.rows[0].email;
                req.session.valid = resolution.isValidated || false;
                req.session.logged_in_as_admin = true;
                req.session.cookie.maxAge = 1000*60*5;
                res.redirect('/admin');
            }
        }else  {
            
            //console.log(req.requestURL)
            res.render('admin.pug',{message:resolution.message});
        }
        
        
    } catch (error) {
        

        error_message = {
            "name": error.name,
            "message":error.message
        }
        //console.log(error_message)
        res.render('admin.pug',{message:error.message});
    }
}



exports.check_if_admin_auth_succesfull = (req,res)=> {
    let auth_successfull;
    if (req.session.valid && req.session.logged_in_as_admin){
        res.render('dashboard.pug');
    }else{
        res.redirect("/admin");
        }  
    
}