const post = require('../models/postModel');
const comment = require('../models/commentModel');

module.exports = (req, res, next) => {
    post.find({ _id: req.params.id})
        .populate('comment')
        .exec()
        .then(data => {
            const ids = [];
            data.map(docs => {
                docs.comment.map(comment => {
                    ids.push(comment._id);
                });
            });
            comment.deleteMany( { _id : {$in: ids}})
                   .exec()
                   .then(res => {
                       next();
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