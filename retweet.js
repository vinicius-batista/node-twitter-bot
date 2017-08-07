const mongoose = require('mongoose');

let Retweet = mongoose.Schema({
    params:{
        type: String,
        required: true
    },
    enable:{
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Retweet', Retweet);