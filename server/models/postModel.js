const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    category: {type: String},
    author: {type: String},
    likes: {type: Number, default: 0},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    time: {type: Date, default: Date.now},
    comment: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

module.exports = mongoose.model('Post', postSchema);
