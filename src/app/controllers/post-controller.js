var Post = require('./../models/post');


exports.createTextPost = (req, res) => {
    let newPost = Post(req.body);

    if (!req.body.username) {
        return res.status(400).json({ success: false, msg: "No username provided"});
    } else {
        if (!req.body.title) {
            return res.status(400).json({ success: false, msg: "Your post needs a title !"});
        } else {
            newPost.save((err, post) => {
                if (err) {
                    return res.status(400).json({ success: false, msg: err });
                }
                return res.status(201).json({success:true, msg: "Post created", post: post });
            });
        }
    }
}


exports.getPostBydId = (req, res) => {
    
    if (!req.params.postid) {
        return res.status(400).json({ success: false, msg: "No post id provided"});
    }

    Post.findOne({ _id: req.params.postid }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, msg: err});
        }

        if (!post) {
            return res.status(400).json({ success: false, msg: "No post found for this id"});
        }

        if (post) {
            return res.status(200).json({ success: true, post: post })
        }
    });
}