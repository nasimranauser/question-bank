const mongoose = require('mongoose');

// answer schema
const answerSchema = new mongoose.Schema({
    examid:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
    questionid:{
        type:String,
        required:true,
    },
    getanswer:{
        type:String,
    },
    canstime:{
        type:String,
        required:true,
    },
    timecount:{
        type:String,
        required:true,
    },
    reject:{
        type: Boolean,
        required:true,
    }
});

// show enrolled exam student dashboard, if exam status is complited true then, if click the exam then check exam status if true then, extends answer colection with examid & userid.

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
