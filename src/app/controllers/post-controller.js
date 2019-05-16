var Post = require('./../models/post');
var Community = require('./../models/community');
var config = require('./../../config/config');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.newsApiKey);

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

exports.getAllNewsPosts = (req, res) => {
    
    var bar = new Promise((resolve, reject) => {
        newsapi.v2.topHeadlines({
            country: 'fr'
          }).then(response => {
    
            Community.findOne({ topic: 'News' }, (err, community) => {
                if (err) {
                    return res.status(400).json({ success: false, msg: err });
                }
    
                // If it can't find a News community
                if (!community) {
                    let newCommunity = Community({
                        createdBy: 'Tadam',
                        createdAt: 'A date',
                        name: 'Latests News',
                        topic: 'News',
                        summary: 'Check the latests news around the world'
                    });
    
                    // create a new community
                    newCommunity.save((err, community) => {
                        if (err) {
                            return res.status(400).json({ success: false, msg: err });
                        }
                        
                        // loop over the response and create posts for each article
                        for (let article of response.articles) {
                            // check that post don't already exists
                            Post.findOne({ title: article.title }, (err, postFound) => {
                                if (err) {
                                    return res.status(400).json({ success: false, msg: err });
                                }
    
                                // If it doesn't exist
                                if (!postFound) {
                                    let newPost = Post({
                                        username: 'Tadam',
                                        community: community.name,
                                        title: article.title,
                                        content: article.content,   
                                        newsApi: true 
                                    });
    
                                    newPost.save((err, post) => {
                                        if (err) {
                                            return res.status(400).json({ success: false, msg: err });
                                        }
                                        resolve('test');
                                    });
                                }
                            });
                        }
                    });
                }
    
                if (community) {
                    console.log('il passe la pcq il a trouve la community');
                    for (let article of response.articles) {
                        console.log('il passe dans la boucle');
                        // check that post don't already exists
                        Post.findOne({ title: article.title }, (err, postFound) => {
                            if (err) {
                                return res.status(400).json({ success: false, msg: err });
                            }
                            if (postFound) {
                                resolve();
                            }
    
                            // If it doesn't exist
                            if (!postFound) {
                                let newPost = Post({
                                    username: 'Tadam',
                                    community: community.name,
                                    title: article.title,
                                    content: article.content,
                                    newsApi: true 
                                });
                                
                                newPost.save((err, post) => {
                                    if (err) {
                                        return res.status(400).json({ success: false, msg: err });
                                    }

                                    resolve();
                                });
                            }
                        });
                    }
                }
            });
        });        
    });
    
    bar.then(() => {
        Post.find({ newsApi: true }, (err, posts) => {
            if (err) {
                return res.status(400).json({ success: false, msg: err });
            }
            return res.status(200).json({ success: true, posts: posts});
        });
    });

}