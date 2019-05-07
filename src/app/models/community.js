var mongoose = require('mongoose');

var CommunitySchema = new mongoose.Schema({
    // user: UserSchema,
    createdBy: String,
    createdAt: String,
    title: String,
    summary: String
});

module.exports = mongoose.model('Community', CommunitySchema);