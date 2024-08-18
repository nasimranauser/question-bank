const mongoose = require('mongoose');

//  exam, if click this then check -> this exam is & this user is exits or not enrolled collection.

const enrollSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    examid:{
        type:String,
        required:true,
    },
    exname:{
        type:String,
        required:true,
    },
    inprice:{
        type:Number,
        required:true,
    },
    payment:{
        cardname:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        trxtime:{
            type:String,
            required:true,
        },
        trxid:{
            type:String,
            required:true,
        },
        paystatus:{
            type:String,
            required:true,
        },
    },
    createat:{
        type:Date,
        default:Date(),
    }
});

const Enroll = mongoose.model('Enroll', enrollSchema);
module.exports = Enroll;