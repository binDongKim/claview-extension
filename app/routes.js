var User = require('./models/user.js');

module.exports = function(app, passport) {

  // home(signin) page
  app.get('/', function(req, res) {
    if(req.isAuthenticated()) {
      res.redirect('/evaluate');
    } else {
      res.render('pages/index', { message: req.flash('signinMessage') });
    }
  });

  // signup page
  app.get('/signup', function(req, res) {
    res.render('pages/signup', { message: req.flash('signupMessage') });
  });

  // evaluate page
  app.get('/evaluate', isAuthenticated, function(req, res) {
    res.render('pages/evaluate', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // evaluation result page
  app.get('/evaluations', function(req, res) {
  });

  // signout
  app.get('/signout', function(req, res) {
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
    failureRedirect : '/', // redirect back to the signin page if there is an error
    failureFlash : true // allow flash messages
  }));

  // do evaluate
  app.post('/evaluate', function(req, res) {
    User.saveResult(req.user.id, req.body.result, req.body.opinion).then(function(updatedUser) {
      res.send('Success');
    }, function(err) {
      console.log('Error: ' + err);
      res.send('Error');
    });
  });
};
// route middleware to make sure a user is authenticated
function isAuthenticated(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't, redirect them to the home page
    res.redirect('/');
}
