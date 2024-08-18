const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// create a schema
const questionSchema = new mongoose.Schema({
    identityexam:{
        type:String,
        required:true,
    },
    question: {
        type:String,
        required:true,
    },
    answer: {
        type:String,
        required:true,
    },
    qhint: {
        type:String,
    },
    type: {
        type:Number,
        required:true,
    },
    refurl: {
        type:String,
    },
    option: {
        oa: {type:String},
        ob: {type:String},
        oc: {type:String},
        od: {type:String}
    },
    hassanswer: {
        type:String,
        required:true,
    },
    publish: {
        type:Boolean,
        default:true,
    },
    createat: {
        type:Date,
        default: Date(),
    }
});

questionSchema.pre('save', async function(){
    const question = this;
    // let's check question is modified or not.
    if(!question.isModified('hassanswer')){
        next();
    }
    // all right.
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hass = await bcrypt.hash(question.hassanswer, saltRound);
        question.hassanswer = hass;
    }catch(err){
        next(err);
    }
});

questionSchema.methods.compareAns = async function(ans){
    try{
        return bcrypt.compare(ans, this.hassanswer);
    }catch(err){console.error(err);}
}

// answer need to question id, examid, userid.

/* if submit then this question is submit -> then this question is hide.
   if question collection id and ans collection id is match then return false. 
   else return true
*/
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;