const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const userRoute  = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute');
const app = express();

mongoose.connect('mongodb://bsousa86:' + process.env.MONGO_DB_PW + '@webappproject-shard-00-00-b1buu.mongodb.net:27017,webappproject-shard-00-01-b1buu.mongodb.net:27017,webappproject-shard-00-02-b1buu.mongodb.net:27017/test?ssl=true&replicaSet=WebAppProject-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/posts', postsRoute);







module.exports = app;