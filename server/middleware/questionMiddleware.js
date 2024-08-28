const Jwt = require('jsonwebtoken');
const Question = require('../models/question-model');
const Answer = require('../models/ans-model');
const Exam = require('../models/exam-model');

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
        const E = await Exam.findOne({_id:examId});
        const Qlenght = await Question.find();
        const len = Qlenght.length;
        const Q = await Question.aggregate([ {$match:{ identityexam: examId }}, { $sample:{size:len} },
            {
                $lookup:{from:'answers', localField:'a', foreignField:'a', as: 'ansdata'}
            } // which user ans data.
         ]) // lookup. identityexam: examId
        // ans and question.
        // ans based get question. = ans examid.
        if(!Q || Q.length===0){
            return res.status(404).json({message:'this exam question not getting. question is null'})
        }

        // parse question data of this current exam.
        req.question = Q;
        req.exam = E;
        req.userId = userId;
        req.token = JwtToken;
        next();
    }catch(err){
        console.log(`Error throwing erro from question middleware ${err}`)
    }
}

module.exports = questionMiddleware

// box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; // qscreen top.