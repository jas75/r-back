var mongoose = require('mongoose');

var CommunitySchema = new mongoose.Schema({
    // user: UserSchema,
    createdBy: String,
    createdAt: String,
    name: String,
    topic: String,
    summary: String
});

module.exports = mongoose.model('Community', CommunitySchema);