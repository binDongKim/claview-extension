var LocalStrategy = require('passport-local').Strategy;
var User          = require('../app/models/user.js');

module.exports = function(passport) {
  // required for persistent login sessions
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // SIGNUP
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    // find a user whose email is the same as the email which is sent from the form
    // if there is no account with the email, create an account
    User.findOne({ 'email' :  email }, function(err, user) {
      if(err)
        return done(err);
      if(user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken!'));
      } else {
        var newUser = new User();
        // set the user's local credentials
        newUser.email    = email;
        newUser.name     = req.body.name;
        newUser.password = newUser.generateHash(password);
        newUser.status   = req.body.status;

        // save the user
        newUser.save(function(err) {
          if(err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  }));

  // SIGNIN
  passport.use('local-signin', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form

    User.findOne({ 'email' : email }, function(err, user) {
      if(err)
        return done(err);
      if(!user)
        return done(null, false, req.flash('signinMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if(!user.validPassword(password))
        return done(null, false, req.flash('signinMessage', 'Oops! Wrong password.')); // create the signinMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });
  }));
};
