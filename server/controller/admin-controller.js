

// import controller function.

const Student = require("../models/student-model");

const getuser = async(req, res, next)=>{
    try{
        const isExits = await Student.find();
        if(!isExits){
            return res.status(400).json({message:'student not found!'});
        }
        res.status(200).json({data:isExits, message:'success'})
    }catch(err){
        next(err);
    }
}


module.exports = {getuser}