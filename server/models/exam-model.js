const mongoose = require('mongoose');
// import examination schema
const examSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    etype:{
        type:String,
    },
    qtype:{
        type:String,
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
        perqmark:{
            type:String,
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
        timespam:{
            type:String,
            required:true,
        },
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
   authority:{
     orgname:{
        type:String,
        default:'RDC'
     },
   },
    award: {
       a1:{
        type:String,
       },
       a2:{
        type:String,
       },
       a3:{
        type:String,
       },
       a4:{
        type:String,
       },
       a5:{
        type:String,
       },
       a6:{
        type:String,
       },
       a7:{
        type:String,
       },
       a8:{
        type:String,
       },
       a9:{
        type:String,
       },
       a10:{
        type:String,
       },
    },
    rules: {
        r1:{
            type:String,
        },
        r2:{
            type:String,
        },
        r3:{
            type:String,
        },
        r4:{
            type:String,
        },
        r5:{
            type:String,
        },
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
