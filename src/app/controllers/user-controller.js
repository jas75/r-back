var User = require('./../models/user');

exports.getUserProfile = (req, res) => {

    if (!req.params.userid) {
        return res.status(400).json({ succes: false, msg: 'No args provided.'})
    } else {
        User.findOne({ _id: req.params.userid }, (err, user) => {
            if (err) {
                return res.status(400).json({ success: false, msg: err});
            }
    
            if (user) {
                return res.status(200).json({ success: true, user: user});
            }
        });
    }
}