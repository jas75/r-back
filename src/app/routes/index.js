var express = require('express');
var router = express.Router();
var userController = require('../controller/user-controller');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {

  return res.send('Hello this the api');
});

module.exports = router;
