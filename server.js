var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser   = require('body-parser'); // POST요청 데이터를 추출하는 미들웨어. request객체에 body 속성을 부여
var configDB     = require('./config/database.js');

mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
// required for passport
app.use(session({
    secret: 'dongbinkim',
    cookie: { maxAge: 1000*60*60 },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes.js')(app, passport);

app.listen(port);
