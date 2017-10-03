const mongoose = require('mongoose');

const Retweet = mongoose.Schema({
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