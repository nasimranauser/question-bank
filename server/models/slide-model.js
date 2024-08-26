const mongoose = require('mongoose')

// create a schem

const slideSchema = new mongoose.Schema({
    eventname:{
        type:String,
        required:true,
    },
    filename:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },
    publishat:{
        type:Date,
        default: Date()
    }
});

// define a model.

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;