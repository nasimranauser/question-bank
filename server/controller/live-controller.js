
// import exam model.

const Exam = require('../models/exam-model')
const Enroll = require('../models/enrolled-model');
const Question = require('../models/question-model');
const Answer = require('../models/ans-model');
const Slide = require('../models/slide-model');





// import controller function.

const slide = async (req, res, next)=>{
    try{
        const data = await Slide.find();
        if(!data){
            return res.status(401).json({message:'preview slide not found!'})
        }

    }catch(err){
        next(err)
    }
}

const add_exam = async (req, res, next)=>{
    try{
        const data = req.body;
        const examCreate = await Exam.create(data);
        if(!examCreate){
            return res.status(404).json({message:'sorry!'})
        }
        res.status(200).json({data:data, message:'added exam'});
    }catch(err){
        next(err)
    }
}

const get_exam = async (req, res, next)=>{
    try{
        const result = await Exam.find({ status: true });
        if(!result){
            return res.status(400).json({message: 'exam not found!'});
        }
        res.status(201).json({message: 'exam getting..', edata: result});
    }catch(err){
        next(err);
    }
}

const get_cexam = async (req, res, next)=>{
    try{
        const eid = req.params.eid;
        const sid = req.params.sid;
        let enrolled = false;
        // check already enrolled or not, then this based send response.
        if(sid !=null){
            const check = await Enroll.findOne({userid: sid, examid: eid});
            if(check){
                enrolled = true;
            }else{
                enrolled = false;
            }
        }
        const result = await Exam.findById(eid);
        if(!result){
            return res.status(404).json({message:'Exam not getting..'})
        }
        res.status(201).json({message:'getting current exam', enroll: enrolled, data: result})
    
    }catch(err){
        console.error(err)
    }
}

const completed = async(req, res, next)=>{
    try{
        // const {uid, data} = req.body;
        res.status(200).json({message:'ok'})
    }catch(err){
        next(err)
    }
}

const enrolled = async (req, res, next)=>{
    try{
        let enroll_data = req.data;
        let exam_data = req.examdata;
        // #find already enrolled or not
        const check = await Enroll.findOne({userid: enroll_data.userid, examid:enroll_data.examid})
        if(check){
           return res.status(400).json({message:'sorry you have a already enrolled this exam!'})
        }
        // #save enrolled record.
        const saveEnrolled = await Enroll.create(enroll_data);
       if(!saveEnrolled){
            return res.status(405).json({message:'enrolled data faild to save!'})
       }
       res.status(203).json({message:'save enrolled data.', endata:enroll_data,examdata:exam_data})

    }catch(err){
        next(err)
    }
}

const joiningexam = async (req, res, next)=>{
    try{
        const {joindata, userid, token} = req;
        res.status(201).json({message:'getting joinning examination data.', joinedata: joindata });
    }catch(err){
        next(err);
    }
}

const addquestion = async (req, res, next)=>{
    try{
        const data = req.body;
        const addQuestion = await Question.create(data);
        if(!addQuestion){
            return res.status(404).json({message:"Question adding faild!"})
        }
        res.status(201).json({message:'Question added success.'})
    }catch(err){
        next(err)
    }
}

const getquestion = async (req, res, next)=>{
    try{
        const q = req.question;
        res.status(200).json({message:'getting.', question: q})
    }catch(err){
        next(err)
    }
}

const reciveanswer = async (req, res, next)=>{
    try{
        const response = req.ansdata;
        // check this question ans already present or not! then go next
        const isValid = await Answer.findOne({examid:response.examid, questionid:response.questionid, userid:response.userid})
        if(isValid){
            //if it's exits, then
            return res.status(405).json({message:'Sorry! you have already submit this question answer!'})
        }
        const saveAns = await Answer.create(response);
        if(!saveAns){
            return res.status(404).json({message:'Answer save faild!'})
        }
        res.status(201).json({message:saveAns.reject});
    }catch(err){
        next(err)
    }
}

const getans = async (req, res, next)=>{
    try{
        const data = req.ansdata;
        res.status(200).json({message:'answer get', ansdata: data})
    }catch(err){
        next(err)
    }
}

module.exports = {add_exam, get_exam, get_cexam, enrolled, joiningexam, completed, getquestion, addquestion, reciveanswer, getans};