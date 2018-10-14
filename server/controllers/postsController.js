const mongoose = require('mongoose');
const post     = require('../models/postModel');

exports.getAllPosts = (req, res, next) => {
    post.find()
        .populate({path :'comment', select: "user text"})
        .populate({path:'likedBy', select: "user _id"})
        .sort({ time : -1})
        .exec()
        .then(data => {
            var response = data.map(posts => {
                return {
                    _id : posts._id,
                    title: posts.title,
                    text: posts.text,
                    category: posts.category,
                    author: posts.author,
                    likes: posts.likes,
                    likedBy: posts.likedBy,
                    time: posts.time,
                    comment: posts.comment
                }
            })
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getUserPosts = (req, res, next) => {
    post.find({author: req.params.user})
        .populate({path :'comment', select: "user text"})
        .sort({ time : -1})
        .exec()
        .then(data => {
            var response = data.map(posts => {
                return {
                    _id : posts._id,
                    title: posts.title,
                    text: posts.text,
                    category: posts.category,
                    author: posts.author,
                    likes: posts.likes,
                    time: posts.time,
                    comment: posts.comment
                }
            });
            res.json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.newPost = (req, res, next) => {
    const newPost = new post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
        author: req.body.author,
    });
    newPost.save()
           .then(result => {
               res.status(201).json({
                   message: 'Post created successfully'
               });
           })
           .catch(err => {
               res.status(500).json({
                   error: err
               });
           });
};

exports.getPost = (req, res, next) => {
    post.find({_id: req.params.id})
        .populate({path : "comment", select : " user text", populate : {path : "user", select : "username email"}})
        .exec()
        .then(data => {
            var response = data.map(info => {
                return {
                    _id: info._id,
                    title: info.title,
                    text: info.text,
                    category: info.category,
                    author: info.author,
                    likes: info.likes,
                    time: info.time,
                    comment: info.comment
                }
            });
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.updatePost = (req, res, next) => {
    if(req.body.likedBy) {
        post.find({ _id: req.params.id })
            .exec()
            .then(data => {
                var newlikes = data[0].likes;
                newlikes++;
                var likedBy = req.body.likedBy;
                post.update({ _id: req.params.id}, {$set : {likes: newlikes}, $push : {likedBy : likedBy} })
                    .exec()
                    .then(result => {
                        res.json({
                            message: "Like section updated"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }) 
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            }); 
    } 
    else {
        var updatedInfo = {};
        for(var info in req.body) {
            if(req.body.hasOwnProperty(info)) {
                updatedInfo[info] = req.body[info];
            }
        }
        post.update({_id: req.params.id}, {$set: updatedInfo})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Post updated"
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            }); 
    } 
};

exports.decrementLikes = (req, res, next) => {
    post.find({ _id: req.params.id })
        .exec()
        .then(data => {
            var newLikes = data[0].likes;
            newLikes--;
            var likedBy = req.body.likedBy;
            var newLikedBy = data[0].likedBy.map((id) => {
                if(id === likedBy) {
                    var index = data[0].likedBy.indexOf(req.body.likedBy);
                    data.splice(index, 1);
                }
            });
            post.update({ _id: req.params.id}, {$set : {likes : newLikes, likedBy: newLikedBy}})
                .exec()
                .then(result => {
                    res.json({
                        message: "Like section updated"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                }); 
        })
        .catch(err => {
            res.status(500).json({
                error: err
            }); 
        }); 
}

exports.deletePost = (req, res, next) => {
    post.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Post deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        }); 
};



