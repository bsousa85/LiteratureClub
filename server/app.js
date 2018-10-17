const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const userRoute  = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute');
const comRoute   = require('./routes/commentsRoute');
const app = express();

mongoose.connect('mongodb://'+ process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PW + process.env.MONGO_LINK, {
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/posts', postsRoute);
app.use('/comments', comRoute);







module.exports = app;
