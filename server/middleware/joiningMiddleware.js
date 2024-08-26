const Jwt = require('jsonwebtoken');
const Enroll = require('../models/enrolled-model');
const Exam = require('../models/exam-model');

const joiningMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message:'Token not getting'})
    }
    const JwtToken = token.replace('Bearer', '').trim();
    // verify token
    try{
        const isVerified = Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(!isVerified){
            return res.status(402).json({message:'Unauthorized Http Token, not provided!'})
        }
        // get token value.
        const user_id = isVerified.userId;
        // get joining exam of this user
        const JoineExam = await Enroll.find({userid: user_id, completed:false});
        if(!JoineExam){
            res.status(404).json({message:'This user not joining any exam!', status:3,})
        }
        // exam info.
        // #db.customer.aggregate([$lookup:{from: "exams", localField:"examid", foregnField:"_id", as: "exinfo"}]);
        // parse enrolled record, with object
        req.joindata = JoineExam;
        req.userid = user_id;
        req.token = JwtToken;
        next();
    }catch(err){
        console.log(`Token verify error ${err}`)
    }
}

module.exports = joiningMiddleware;