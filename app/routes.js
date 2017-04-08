var User = require('./models/user.js');
var Evaluation = require('./models/evaluation.js');

module.exports = function(app, passport) {

  // home(signin) page
  app.get('/', function(req, res) {
    if(req.isAuthenticated()) {
      if(req.user.status == 'student') {
        res.redirect('/evaluate');
      } else {
        res.redirect('/evaluations');
      }
    } else {
      res.render('pages/index', { message: req.flash('signinMessage') });
    }
  });

  // signup page
  app.get('/signup', function(req, res) {
    res.render('pages/signup', { message: req.flash('signupMessage') });
  });

  // evaluate page
  app.get('/evaluate', isAuthenticated, isStudent, function(req, res) {
    Evaluation.getEvaluation(req.user.id).then(function(evaluation) {
      res.render('pages/evaluate', {
        user : req.user, // get the user out of session and pass to template
        evaluation : evaluation,
        message: req.flash('authorityMessage')
      });
    }, (err) => { console.log(err); });
  });

  // evaluation result page
  app.get('/evaluations', isAuthenticated, isProfessor, function(req, res) {
    Promise.all([Evaluation.getGoodEvaluations(), Evaluation.getBadEvaluations()]).then(function(evaluations) {
      res.render('pages/evaluations', {
        user : req.user,
        goodEvaluations : evaluations[0],
        badEvaluations : evaluations[1],
        message: req.flash('authorityMessage')
      });
    }, (err) => { console.log(err); });
  });

  // signout
  app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // do signup
  app.post('/signup', passport.authenticate('local-signup', { failureRedirect : '/signup', failureFlash : true }),
  (req, res) => { if(req.user.status == 'student') { res.redirect('/evaluate') } else { res.redirect('/evaluations') } });

  // do signin
  app.post('/signin', passport.authenticate('local-signin', { failureRedirect : '/', failureFlash : true }),
  (req, res) => { if(req.user.status == 'student') { res.redirect('/evaluate') } else { res.redirect('/evaluations') } });

  // do evaluate
  app.post('/evaluate', function(req, res) {
    var id = req.user.id;
    var result = req.body.result;
    var opinion = req.body.opinion ? req.body.opinion : 'No opinion.';
    Evaluation.submitEvaluation(id, result, opinion).then(function(data) {
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
    if(req.isAuthenticated())
      return next();
    // if they aren't, redirect them to the home page
    res.redirect('/');
}

function isStudent(req, res, next) {
  if(req.user.status == 'student')
    return next();
  req.flash('authorityMessage', 'You have no authority to access that page');
  res.redirect('/');
}

function isProfessor(req, res, next) {
  if(req.user.status == 'professor')
    return next();
  req.flash('authorityMessage', 'You have no authority to access that page');
  res.redirect('/');
}
