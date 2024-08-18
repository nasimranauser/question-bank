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
            default: 'Card Name'
        },
        price:{
            type:Number,
            default: '110'
        },
        trxtime:{
            type:String,
            default: '12 Jan 2024, 12:00AM'
        },
        trxid:{
            type:String,
            default: 'trx_12324345abcdef'
        },
        paystatus:{
            type:String,
            default: false,
        },
    },
    createat:{
        type:Date,
        default:Date(),
    }
});

const Enroll = mongoose.model('Enroll', enrollSchema);
module.exports = Enroll;