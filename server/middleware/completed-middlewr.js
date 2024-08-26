const Jwt = require('jsonwebtoken');
const Enroll = require('../models/enrolled-model');

const completedMiddleware = async(req, res, next)=>{
    // get info.
    const token = req.header('Authorization');
    // validation.
    if(!token){
        return res.status(401).json({message:'Unathorized token! token not provided!'})
    }
    // replace token.
    const JwtToken = token.replace('Bearer ', '').trim();
    // check token is valid or not.
    try{
        const isVerify = await Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(!isVerify){
            return res.status(402).json({message:'Invalid token, unAuthorized Http!'})
        }
        // get user data.
        const uid = isVerify.userId;
        const completed = await Enroll.find({userid:uid, completed: true});
        if(!completed || completed.length==0){
          return  res.status(403).json({message:'completed exam not found!'})
        }
        req.uid = uid;
        req.data = completed;
        next();
    }catch(err){
        console.log(`completed middleware error ${err}`)
    }
}

module.exports = completedMiddleware;