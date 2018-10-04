const mongoose = require('mongoose');
const post     = require('../models/postModel');

exports.getAllPosts = (req, res, next) => {
    post.find()
        .sort({ time : -1})
        .then(data => {
            var response = data.map(posts => {
                return {
                    _id : posts._id,
                    title: posts.title,
                    text: posts.text,
                    category: posts.category,
                    author: posts.author,
                    votes: posts.votes,
                    time: posts.time
                }
            })
            /*var response = {
                //posts_count: data.length,
                all_posts : data.map(posts => {
                    return {
                        _id : posts._id,
                        title: posts.title,
                        text: posts.text,
                        category: posts.category,
                        author: posts.author,
                        votes: posts.votes,
                        time: posts.time
                    }
                })
            } */
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

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
        .exec()
        .then(data => {
            var response = data.map(info => {
                return {
                    _id: info._id,
                    title: info.title,
                    text: info.text,
                    category: info.category,
                    author: info.author,
                    votes: info.votes,
                    time: info.time
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
    var updatedInfo = {};
    for(var info in req.body) {
        if(req.body.hasOwnProperty(info)) {
            updatedInfo[info] = req.body[info];
            console.log(info);
            console.log(updatedInfo[info]);
        }
    }

    post.update({_id: req.body.id}, {$set: updatedInfo})
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
};

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



