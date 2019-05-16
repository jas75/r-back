var mongoose = require('mongoose');

var CommunitySchema = new mongoose.Schema({
    // user: UserSchema,
    createdBy: String,
    createdAt: String,
    name: {
        type: String,
        unique: true,
        required: true
    },
    topic: {
        type: String,
        unique: true,
        required: true
    },
    summary: String
});

module.exports = mongoose.model('Community', CommunitySchema);