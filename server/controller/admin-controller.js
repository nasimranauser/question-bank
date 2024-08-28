

// import controller function.

const Student = require("../models/student-model");
const Exam = require('../models/exam-model');
const Enroll = require("../models/enrolled-model");
const Answer = require('../models/ans-model')

// collection
const getcollection = async(req, res, next)=>{
    try{
        const data = await Exam.aggregate([ { $lookup:{from: 'exams', localField:'examid', foreignField:'_id', as: 'attdata' } } ])
        if(!data || data.length == 0){
            return res.status(401).json({message:'data not found!'})
        }
        res.status(200).json({message:'ok', data:data})
    }catch(err){
        next(err)
    }
}

const ansdeleted = async(req, res, next)=>{
    try{
        const op = await Answer.deleteMany();
        if(!op){
            return res.status(403).json({message:'faild to deleted!'})
        }
        res.status(202).json({message:'answer deleted!'})
    }catch(err){
        next(err)
    }
}

// user
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

const userdelete = async(req, res, next)=>{
    try{
        const op = await Student.deleteMany();
        if(op){
            res.status(200).json({message:'all user deleted success.'})
        }else{
            res.status(400).json({message:'somthing went wrong!'})
        }
    }catch(err){
        next(err)
    }
}

// exam
const examcreate = async (req, res, next)=>{
    try{
        const data = req.body;
        const op = await Exam.create(data);
        if(!op){
            return res.status(400).json({message:'Initialization error of examination!'})
        }        
        res.status(201).json({message:'Examination Created.'})
    }catch(err){
        next(err)
    }
}
const exam = async(req, res, next)=>{
    try{
        const op = await Exam.find();
        if(!op){
            return res.status(400).json({message:'Examination not found!'})
        }
        res.status(200).json({message:'success', data:op})
    }catch(err){next(err)}
}
const examdelete = async (req, res, next)=>{
    try{
        const op = await Exam.deleteMany();
        if(!op){
           return res.status(400).json({message:'somthing went wrong!'})
        }
        res.status(200).json({message:'successfully deleted all examination.'})
    }catch(err){
        next(err)
    }
}

const enrolleddata = async (req, res, next)=>{
    try{
         const data = await Enroll.find({examid:'66cb9bced6259f8571d9bef1'});
        // const data = await  Enroll.aggregate({$lookup:{from: "exams", localField:"examid", foregnField:"_id", as: "exinfo"}});
        if(!data){
            return res.status(402).json({message:"record not found!"})
        }
        res.status(200).json({message:'success',record: data})

    }catch(err){
        next(err)
    }
}

module.exports = {getcollection, ansdeleted, getuser,userdelete,examcreate, exam,examdelete,enrolleddata}