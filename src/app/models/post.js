var mongoose = require('mongoose');
var UserSchema = require('./user');

var PostSchema = new mongoose.Schema({
    // user: UserSchema,
    username: String,
    community: String,
    title: String,
    content: String
});

module.exports = mongoose.model('Post', PostSchema);