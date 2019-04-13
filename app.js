var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./src/config/config');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
passport.use(passport.initialize());

var passportMiddleware = require('./src/app/middleware/passport');
passport.use(passportMiddleware);

app.get('/', function(req, res) {
    return res.send('Hello! The API is at http:// localhost:3000/api');
});

app.use(express.static(path.join(__dirname, 'src/public')));

var routes = require('./src/routes/index.js');
app.use('/api', routes);

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
    console.log("MongoDb connection error. Please make sure MongoDB is running." + err);
    process.exit();
});

module.exports = app;
