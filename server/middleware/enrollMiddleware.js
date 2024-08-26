const Jwt = require('jsonwebtoken');
const Exam = require('../models/exam-model');

const enrollMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message:'Unauthorize Http Error!'})
    }    
    // replace token
    const JwtToken = token.replace(`Bearer`, '').trim();
    // verify token
    try{
        const isVerified = await Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(isVerified){
            const name = isVerified.name;
            const user_id = isVerified.userId;
            const { examid } = req.body;
            // get exam info.
            const exam = await Exam.findOne({_id:examid});
           let enroll_data = {
                userid: user_id,
                username: name,
                examid: examid,
                exname: exam.name,
                inprice: exam.price, 
                authority: exam.authority.orgname,
                examdtime:exam.schedule.datetime,
                examtime:exam.schedule.timespam
                // add exam terms file.
            }
            req.data = enroll_data;
            req.examdata = exam;
            console.log(`enrolled data ${enroll_data.userid}`)
            next();
        }else{
            res.status(401).json({message: 'Invalid token'});
        }
    } catch(err){
        console.error(err)
    }
}

module.exports = enrollMiddleware;