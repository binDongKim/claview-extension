var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //POST요청 데이터를 추출하는 미들웨어. request객체에 body 속성을 부여.
var mongoose = require('mongoose');
var User = require('./models/user');
var route = require('./route.js')(app, User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://127.0.0.1/claview');

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
 console.log("Server has started on port " + port);
});
