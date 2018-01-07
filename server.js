// server.js
// Setup and server AnyTable app
// SETUP =======================================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// Configuration ===============================================
var pg = require('knex')({
    client: 'pg',
    connection: configDB, 
    searchPath: ['knex', 'public']
});

// require ('./config/passport')(passport); // pass passport
//
// Setup express app
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // setup ejs for templating

// Required for passport
app.use(session({
  secret: process.env.SECRET || 'anytableisgoodforme',
  resave: false,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // presistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// Routes =======================================================
// Load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

// Launch =======================================================
app.listen(port);
console.log("App running on port: " + port);
