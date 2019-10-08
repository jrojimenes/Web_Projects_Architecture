module.exports = {

    isLoggedIn(req, res, next){

        if(req.isAuthenticated()){
             return next();
        }
        
        return res.redirect('/signIn');
        
    },

    isNotLoggedIn(req, res, next){
            
        if(!req.isAuthenticated()){
            return next();
       }
       
       return res.redirect('/profile');
    }

};