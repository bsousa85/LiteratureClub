const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: String, required: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref:'Post', required: true},
    text: {type: String, required: true}
})

module.exports = mongoose.model('Comment', commentSchema);