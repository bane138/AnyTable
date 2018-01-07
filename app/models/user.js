// app/models/user.js
// User model
//
var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');

// Define schema for user model
var userSchema = pg.
