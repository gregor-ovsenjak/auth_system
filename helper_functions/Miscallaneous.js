




exports.validateEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


exports.returnLastLogin = function(active_users) {
    
    let keys = Object.keys(active_users[0])
    for(let i = 0; i<active_users.length;i++){
        let active_user = active_users[i]
        for(key in keys){
            active_user[keys[key]] = active_user[keys[key]] != null ? active_user[keys[key]] : "No login yet."  
        }
        active_users[i] = active_user
    }
    return active_users
}