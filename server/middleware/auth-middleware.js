const Jwt = require('jsonwebtoken');
const Student = require('../models/student-model');

const authMiddleware = async(req, res, next)=>{
    // get info
    const token = req.header('Authorization');
    // let's check token is get or not
    if(!token){
        return res.status(400).json({message: 'Cannot get Token, Unauthorized Http'})
    }
    // convert token in to the real formate.
    const JwtToken = token.replace('Bearer', '').trim();
    // verify token
    try{
        const isVerified = await Jwt.verify(JwtToken, process.env.JWT_SECRET);
        if(isVerified){
            // is it's true
            console.log('token is valid.')
            // get data
            const uId = isVerified.userId;
            console.log(`User ID ${uId}`)
            const userdata = await Student.findOne({_id:uId});
            req.user = userdata;
            req.token = JwtToken;
            req.studentid = userdata.studentid;
            next();
        }else{
            res.status(401).json({message: 'Invalid token'});
        }
    }catch(err){
        res.status(402).json({message: 'Unauthorized token!'});
    }
}

module.exports = authMiddleware;