// server.js
// Setup and server AnyTable app
// SETUP =======================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var pg = require('pg');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// Configuration ===============================================
//mongoose.connect(configDB.url);
const client = new pg.Client(configDB.url);
client.connect();
// require ('./config/passport')(passport); // pass passport
//
// Setup express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs'); // setup ejs for templating

// Required for passport
app.use(session({secret: 'anytableisgoodforme'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // presistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes =======================================================
// Load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

// Launch =======================================================
app.listen(port);
console.log("App running on port: " + port);
