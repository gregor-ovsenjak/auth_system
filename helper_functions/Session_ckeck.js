
exports.check_session =  function (string){
    return async (req, res, next) => {
        try {
            if (req.session.valid === true){
                //console.log(req.session.valid,req.session.logged_in_as_admin)
                //console.log(req.session||"black");
                next()
           }else{ 
               // console.log(false,"1")
                req.session.redirect = string;
                next();
            }
            
        }
        catch (error) {
            next(error)
        }
    }
}


exports.check_if_session_valid = async (req,res)=> {

    if (req.session.valid === true && req.session.logged_in_as_admin === true){
        console.log(1)
        res.redirect('/admin/dashboard')
    }else if (req.session.valid === true && req.session.logged_in_as_admin ==false){
        console.log(2)
        res.redirect('/placeholder')
   }else{ 
        console.log(3)
        console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
        res.render(req.session.redirect);
    }
    
}


exports.check_session_dashboard =  function (string){
    return async (req, res, next) => {
        try {
            if (req.session.valid === true){
                console.log(req.session.valid);
                next()
           }else{ 
                console.log(req.session.valid);
                res.redirect("/admin");
            }
            
        }
        catch (error) {
            next(error)
        }
    }
}