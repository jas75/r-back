var Post = require('./../models/post');


exports.createTextPost = (req, res) => {
    let newPost = Post(req.body);

    if (!req.body.userid) {
        return res.status(400).json({ success: false, msg: "No username provided"});
    } else {
        if (!req.body.title) {
            return res.status(400).json({ success: false, msg: "Your post needs a title !"});
        } else {
            newPost.save((err, post) => {
                if (err) {
                    return res.status(400).json({ success: false, msg: err });
                }
                return res.status(201).json({success:true, msg: "Post created"});
            });
        }
    }

}