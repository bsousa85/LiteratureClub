const post     = require('../models/postModel');


module.exports = (req, res, next) => {
    if(req.id) {
        var comment = req.id;
        post.update({_id: req.body.post}, {$push : {comment : comment}})
            .exec()
            .then(result => {
                res.json({
                    message: "Comment added"
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
}