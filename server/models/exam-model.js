const mongoose = require('mongoose');
// import examination schema
const examSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    title: {
        type:String,
        required:true,
    },
    desc: {
        type:String,
        required:true,
    },
    refurl: {
        type:String,
        required:true,
    },
    marks: {
        fullmark: {
            type:String,
            required:true,
        },
        passmark: {
            type:String,
            required:true,
        },
        negetivemark: {
            type:String,
            required:true,
        },
    },
   schedule: {
        datetime: {
            type:String,
            required:true,
        },
        timehour: {
            type:String,
            required:true,
        },
        timeminute: {
            type:String,
            required:true,
        }
   },
   identity: {
        class: {
            type:String, 
            required:true,
        },
        deparment: {
            type:String,
            required:true,
        }
    },
    award: {

    },
    rules: {

    },
    price:{
        type:String,
        required:true,
    },
    publish: {
        type:Boolean,
        default:false,
    },
    status: {
        type:Boolean,
        default: false,
    },
    createat: {
        type: Date,
        default: Date(),
    }

});

// click exam, check is enrolled or not, if enrolled then get exam info -> time, if time is equal current day, then get this exam inside all question.
// match user class & this exam identity class, if is matched then enrool true, else enroll false.

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
