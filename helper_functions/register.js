
register_controler = require('../models/authenticate')
validator = require("../helper_functions/Miscallaneous")




exports.check_register_request = async (req,res) => {
    
    try {
        //regex check for email validity
        let email = validator.validateEmail(req.body.Email);
        // puts values to the is_registered variable
        let is_registered = email ? await register_controler.check_registration(req,res) : {valid:false,message:"Your email is not valid."};

        return(is_registered);
    } catch (error) {
        console.log(error.message)
        error_message = {
            "name": error.name,
            "message":error.message
        }
        res.send(error.message);
    }
    
}