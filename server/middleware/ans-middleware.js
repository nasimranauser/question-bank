const Jwt = require('jsonwebtoken')

const ansMiddleware = async (req, res, next)=>{
    const token = req.header('Authorization');
    const data = req.body;
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
        req.ansdata = {
            examid:data.examid,
            userid:user_id,
            questionid:data.questionid,
            getanswer:data.getanswer,
            canstime:data.canstime,
            timecount:data.timecount,
            reject:data.reject,
        }
        next();
    }catch(err){
        console.error(`ans middleware error ${err}`)
    }
}

module.exports = ansMiddleware;