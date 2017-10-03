const mongoose = require('mongoose');

const Reply = new mongoose.Schema({
    track:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    enable:{
        type: Boolean,
        required: true,
        default: false
    }
    
});


module.exports = mongoose.model('Reply', Reply);