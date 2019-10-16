const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const helpers = require('./helpers');
const pool = require('../database');

//////////////////////////////////////////////////////Method for signIn

passport.use('local.signin', new localStrategy({
    
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

  }, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(password, user.password)
      if (validPassword) {
          //null-error/ user for persist/ message 
        done(null, user, req.flash('success', 'Welcome ' + user.username));
      } else {
        done(null, false, req.flash('error', 'Incorrect Password'));
      }
    } else {
      
      return done(null, false, req.flash('error', 'The Username does not exists.'));
    }
  }));  


//////////////////////////////////////////////////////Method for signUp
passport.use('local.signup', new localStrategy({
   
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
try{
    const {fullname} = req.body;
    const newUsr = {
      FICUSERNAME : username,
      FICPASSWORD : await helpers.encryptPsw(password),
      FCFULLNAME  : fullname
    };
   const result = await pool.query('CALL SPWEBINSERTNEWUSERS(?, ?, ?)',[newUsr.FICUSERNAME, 
                                                                        newUsr.FICPASSWORD, 
                                                                        newUsr.FCFULLNAME
                                                                      ]);
   newUsr.id = result.insertId;
   return done(null, newUsr);
  }
  catch(ex){
       console.log('Error appers: '+ ex.message);
  }
}));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) =>{
try{
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  
   return done(null, rows[0]);
}
catch(ex){
   console.log(ex.message);
}
});