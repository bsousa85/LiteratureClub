const mongoose = require('mongoose');
const comment  = require('../models/commentModel');

exports.getAllComments = (req, res, next) => {
    comment.find()
           .populate('post')
           .exec()
           .then(data => {
                var response = data.map(doc => {
                    return {
                        id: doc._id,
                        text: doc.text,
                        user: doc.user,
                        post: doc.post
                    };
                });
                res.json(response);
           })
           .catch(err => {
               res.json({
                   message: "Error while getting all comments"
               });
           });
};

exports.getPostComments = (req, res, next) => {
    comment.find( {post: req.params.id})
           .exec()
           .then(data => {
               var response = data.map(doc => {
                   return {
                       id: doc._id,
                       text: doc.text,
                       user: doc.user,
                   };
               });
               res.json(response);
           })
           .catch(err => {
                res.json({
                    message: "Error while getting post comments"
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
               res.json({
                   message: "Error while getting comment"
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
    req.id = newComment._id;
    req.comment = newComment;
    newComment.save()
              .then(result => {
                  next();
              }) 
              .catch(err => {
                  res.json({
                      message: "Error while adding comment"
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
               res.json({
                   message: "Error while updating comment"
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
               res.json({
                   message: "Error while deleting comment"
               });
           });
};