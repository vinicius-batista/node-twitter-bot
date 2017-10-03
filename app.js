const config = require('./config');
const twit = require('twit');
const mongoose = require('mongoose');
const retweet = require('./src/actions/retweet');
const replyWithStream =  require('./src/actions/replyWithStream');


const Twiiter = new twit(config);

mongoose.Promise = global.Promise;
const db = mongoose.connect(process.env.PROD_MONGODB).connection;

db.on('open', () => {
    retweet(Twiiter);
    replyWithStream(Twiiter);
});


module.exports = Twiiter;