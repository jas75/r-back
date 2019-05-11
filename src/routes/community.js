var express = require('express');
var router = express.Router();
var passport = require('passport');
var communityController = require('./../app/controllers/community-controller')


router.post('/create-community', passport.authenticate('jwt', { session: false}), communityController.createCommunity);

router.get('/get-community/:communityid', communityController.getCommunityById)
module.exports = router;
