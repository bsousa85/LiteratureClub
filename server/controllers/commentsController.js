const mongoose = require('mongoose');
const comment  = require('../models/commentModel');

exports.getAllComments = (req, res, next) => {
    comment.find()
           .populate('user', "username email")
           .populate('post')
           .exec()
           .then(data => {
                var response = data.map(doc => {
                    return {
                        id : doc._id,
                        text: doc.text,
                        user: doc.user,
                        post: doc.post
                    };
                });
                res.json(response);
           })
           .catch(err => {
               res.status(500).json({
                   error: err
               });
           });
};

exports.getComment = (req, res, next) => {
    comment.find({_id: req.params.id})
           .populate('user')
           .populate('post')
           .exec()
           .then(data => {
               var response = data.map(doc => {
                   return {
                    id: doc._id,
                    text: doc.text,
                    user: doc.user,
                    post: doc.post
                   }
               });
               res.json(response);
           })
           .catch(err => {
               res.status(500).json({
                   error: err
               });
           });
};

exports.addComment = (req, res, next) => {
    const newComment = new comment({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        text: req.body.text,
        post: req.body.post
    });
    newComment.save()
              .then(result => {
                  res.json({
                      message: 'Comment added successfully'
                  });
              })
              .catch(err => {
                  res.json({
                      error: err
                  });
              });
};;

exports.updateComment = (req, res, next) => {
    const text = req.body.text;
    comment.update({_id: req.params.id}, {$set: {text : text}})
           .exec()
           .then(result => {
               res.json({
                   message: "Comment updated"
               });
           })
           .catch(err => {
               res.status(500).json({
                   error: err
               });
           });
};

exports.deleteComment = (req, res, next) => {
    comment.remove({_id: req.params.id})
           .exec()
           .then(result => {
               res.json({
                   message: "Comment deleted"
               });
           })
           .catch(err => {
               res.status(500).json({
                   error : err
               });
           });
};