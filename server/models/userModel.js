const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true, match:/[A-Za-z0-9_-]{3,15}/},
    password: {type: String, required: true, match:/[A-Za-z0-9_-]{3,15}/},
    email: {type: String, required: true, match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/}
});

module.exports = mongoose.model('User', userSchema);