var bcrypt = require('bcrypt');

exports.cryptPassword = async function(password) {
    salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
};

exports.comparePassword =async function(password, hashword) {
    try {
        match = await bcrypt.compare(password,hashword);
        return match;
    } catch (error) {
        console.log(error);
    }
    
}