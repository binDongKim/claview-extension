module.exports = function(app, passport) {

  // home page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // page for signup
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // page for signin
  app.get('/signin', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signin.ejs', { message: req.flash('signinMessage') });
  });

  // page for students to evaluate
  app.get('/evaluate', isLoggedIn, function(req, res) {
    res.render('evaluate.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // page for the professor to see the result
  app.get('/evaluations', function(req, res) {

  });

  // logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // do signup
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/evaluate', // redirect to the evaluate page
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // do signin
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/evaluate', // redirect to the evaluate page
    failureRedirect : '/signin', // redirect back to the signin page if there is an error
    failureFlash : true // allow flash messages
  }));

  // do evaluate
  app.put('/evaluate', function(req, res) {

  });
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
