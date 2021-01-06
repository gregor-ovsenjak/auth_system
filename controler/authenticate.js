let validator = require('../helper_functions/Check_password_username');
let encryptor = require('../helper_functions/encrypt');
let authenticator = require('../models/authenticate.js');
let registrator = require('../helper_functions/register')
const url = require('url'); 
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy


exports.check_register =async(req,res) => {
    try {
        let register_query_results = await registrator.check_register_request(req,res);
        if (register_query_results.valid){
            // checks for password strength
            let password_strength = validator.check_password_strength(req.body.Password);
            if (password_strength.satisfactory){
                req.body.Password = await encryptor.cryptPassword(req.body.Password);
                await authenticator.register_query(req,res);
                res.redirect("/login");
            }else{
                res.render('register.pug',{message:"Your password is too short."});
            }
        }else{
            res.render('register.pug',{message:register_query_results.message});
        }
    } catch (error) {
        console.log(error.message)
        error_message = {
            "name": error.name,
            "message":error.message
        }
        res.send(error.message);
    }

}


exports.check_login = async (req,res)=> {
    try {
        let user = await authenticator.login_query(req,res);
        let resolution = await validator.login_validation(user,req);
        if (resolution.isValidated){
            req.session.user = user.rows[0].username;
            req.session.email = user.rows[0].email;
            req.session.valid = resolution.isValidated || false;
            req.session.userID = req.session.id
            req.session.logged_in_as_admin = false;
            res.redirect('/placeholder')
            
        }else {
            
            res.render('index.pug',{message:resolution.message});
        }
        
        
    } catch (error) {
        

        error_message = {
            "name": error.name,
            "message":error.message
        }
        res.send(error_message);
    }
}


exports.check_if_auth_succesfull = (req,res)=> {
    let auth_successfull;
    if (req.session.valid === undefined){
         auth_successfull =  false;
    }else{ auth_successfull = req.session.valid}
    
    if (auth_successfull){
        res.render('placeholder.pug',{ username: req.session.user,email:req.session.email});
    }else{
        res.redirect("/login");
    }
    
}





