const express                     = require('express');
const router                      = express.Router();
const passport                    = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.get('/signup', (req,res) => {
res.render('auth/signup');

});


router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', (req,res) => {
    res.render('auth/signIn');
});


router.post('/signIn', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: 'signIn',
        failureFlash: true
    })(req, res, next);
});

///isNotLoggedIn to protect views
router.get('/profile', isLoggedIn ,(req,res) => {
    res.render('profile');

});


router.get('/logout', (req, res) => {

    req.logOut();
    res.redirect('/signIn');

});

module.exports = router;