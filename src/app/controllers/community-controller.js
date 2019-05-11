var Community = require('./../models/community');

exports.createCommunity = (req, res) => {

    if (!req.body) {
        return res.status(400).json({ success: false, msg: 'Internal server error'});
    }

    if (!req.body.createdBy || !req.body.createdAt) {
        return res.status(400).json({ success: false, msg: 'Missing parameters'});
    }

    if (!req.body.name) {
        return res.status(400).json({ success: false, msg: 'Your community needs a name'});
    }

    if (!req.body.topic) {
        return res.status(400).json({ success: false, msg: 'Your community needs a topic'});
    }

    let community =  Community(req.body);

    community.save((err, community) => {
        if (err) {
            return res.status(400).json({ success: false, msg: err});
        }

        return res.status(200).json({ success: true, community: community});
    })
    
}


exports.getCommunityById = (req, res) => {
    
    if (!req.params.communityid) {
        return res.status(400).json({ success: false, msg: 'No community ID provided'})
    }
    Community.findOne({ _id: req.params.communityid }, (err, community) => {
        if (err) {
            return res.status(400).json({ success: false, msg: err})
        }

        if (!community) {
            return res.status(400).json({ success: false, msg: 'No community found'})
        }

        if (community) {
            return res.status(200).json({ success: true, community: community});
        }
    });
}