var express = require('express');
var router = express.Router();
var userController = require('../controller/user-controller');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.send('Hello this the api');
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({ msg: 'Hey' + req.user.email });
});


module.exports = router;
