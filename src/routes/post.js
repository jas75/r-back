var express = require('express');
var router = express.Router();
var passport = require('passport');
var postController = require('./../app/controllers/post-controller')


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({ msg: 'Hey' + req.user.email + 'you re on post page' });
});

router.post('/text', passport.authenticate('jwt', { session: false }), postController.createTextPost);
// no need to secure this routes since it's accessible when not auth
router.get('/get-post/:postid', postController.getPostBydId);

module.exports = router;
