var express = require('express');
var router = express.Router();
var userController = require('./../app/controllers/user-controller');
var passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-profile/:userid', passport.authenticate('jwt', { session:false }), userController.getUserProfile);

module.exports = router;
 