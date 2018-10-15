const post     = require('../models/postModel');


module.exports = (req, res, next) => {
    if(req.id) {
        var commentID = req.id;
        var comment = req.comment;
        post.update({_id: req.body.post}, {$push : {comment : commentID}})
            .exec()
            .then(result => {
                res.json({
                    message: "Comment added",
                    comment: comment
                });
            })
            .catch(err => {
                res.json({
                    message: "Error while adding comment. Please try again"
                });
            });
    }
}