const Jwt = require('jsonwebtoken');
const Question = require('../models/question-model');
const Answer = require('../models/ans-model');

const questionMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');
    const examId = req.header('examId');
    if(!token){
        return res.status(401).json({message:'cannot get token!'})
    }
    const JwtToken = token.replace('Bearer', '').trim();
    // verify token
    try{
        const isVerified = await Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(!isVerified){
            return res.status(402).json({message:'Invalid token! UnAuthorized Http!'})
        }
        // get value
        let userId = isVerified.userId;
        // getting question ref exam. )) condition is not equal to ans question id.
        const isChecked = await Answer.find({examid:examId});
        const Q = await Question.find({identityexam: examId})
        // const Q = await Question.find({identityexam: examId, _id: { $ne: isChecked.questionid }})
        // console.log(`Answer record: ${isChecked}`)
        if(Q.length===0){
            return res.status(404).json({message:'this exam question not getting. question is null'})
        }
        // parse question data of this current exam.
        req.question = Q;
        req.userId = userId;
        req.token = JwtToken;
        next();
    }catch(err){
        console.log(`Error throwing erro from question middleware ${err}`)
    }
}

module.exports = questionMiddleware

// box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; // qscreen top.