const Jwt = require('jsonwebtoken');
const Answer = require('../models/ans-model');

const ansMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');
    const examId = req.header('examid');

    if(!token){
        res.status(401).json({message:'Token not provided'})
    }
    const JwtToken = token.replace('Bearer', '').trim();
    // verify token
    try{
        const isVerified = await Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(!isVerified){
            return res.status(402).json({message:'Unauthorized Http, Invalid Token!'})
        }
        // get constand value
        const user_id = isVerified.userId;
        // get answer with this exam question
        const getAnswer = await Answer.find({examid:examId, userid: user_id});

        req.ansdata = getAnswer;
        next();
    }catch(err){
        console.error(`ans middleware error ${err}`)
    }
}

module.exports = ansMiddleware;