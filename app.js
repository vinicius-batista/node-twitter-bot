const config = require('./config');
const twit = require('twit');
const mongoose = require('mongoose');
const retweet = require('./src/actions/retweet');
const replyWithStream =  require('./src/actions/replyWithStream');


const Twiiter = new twit(config);

mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.PROD_MONGODB, {
    useMongoClient: true
    })
    .then(() => {
        retweet(Twiiter);
        replyWithStream(Twiiter);
    })
    .catch(err => err);

module.exports = Twiiter;