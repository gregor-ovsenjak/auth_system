
let encryptor = require('../helper_functions/encrypt');



function ToValidate(validate,expr,bool){
    validate.message = expr;
    validate.isValidated = bool;
    return validate;
}





exports.check_password_strength = function(password) {
    // checks password length 
    if (password.length < process.env.PASSWORD_LENGTH) {
        return {message:"Too short",satisfactory:false};
    }else {
        // checks minimum requirements for password security
        regex_checker = [/[A-Z]/,/[a-z]/,/\d/,/[!_.-]/];
        let sum = 0;
        regex_checker.forEach(ex => {
            sum += password.match(ex) ? 1 : 0;
        });

        switch(sum){
            // returns descriptions of password strength
            case 1: return {message:"Weak",satisfactory:true}; break;
            case 2: return {message:"Ok",satisfactory:true}; break;
            case 3: return {message:"Strong",satisfactory:true}; break;
            case 4: return {message:"Awesome",satisfactory:true}; break;
            default: return {message:"Weird",satisfactory:false}; break;
        }
    }
}


exports.login_validation =async function(user,req) {
    const validate = {
        isValidated: true,
        message:"",
    }

    if (user.rows.length == 0){

        return(ToValidate(validate,"Your email is wrong or you haven't registered yet.",false));
        

    }else {
            Username = user.rows[0].username;
            hashPassword = user.rows[0].password;
            const matching_passwords = await encryptor.comparePassword(req.body.Password,hashPassword);
            if(req.body.Username == Username && matching_passwords){

                return(ToValidate(validate,`Hello ${Username}. You are logging in...`,true));
                
                

            }else if (req.body.Username !=Username || matching_passwords){

                return(ToValidate(validate,"Your password or your username are wrong.",false));
                

            }

        }
}
