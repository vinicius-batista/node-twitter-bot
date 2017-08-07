const config = require('./config');
const twit = require('twit');
const mongoose = require('mongoose');

let Twiiter = new twit(config);

mongoose.Promise = global.Promise;
let db = mongoose.connect(process.env.PROD_MONGODB).connection;

db.on('open',function () {
    require('./src/actions/retweet')(Twiiter);
    require('./src/actions/replyWithStream')(Twiiter);
});


module.exports = Twiiter;