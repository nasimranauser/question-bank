// import models
const Student = require('../models/student-model')
const Test = require('../models/test-model')

// import controller function

const home = async (req, res)=>{
    try{
        res.status(200).json('Home page')
    }catch(err){
        next(err);
    }
}

const register = async (req, res, next)=>{
    try{
        const response = req.body;
        const check = await Student.findOne({phone:response.phone});
        if(check){
            return res.status(405).json({message:'You have a already account ! Login now', status:false})
        }
        const insertRecord = await Student.create(response);
        if(!insertRecord){
            return res.status(403).json({message:'Data inserting an error!'})
        }
        res.status(200).json({message:'Inserted success', token: await insertRecord.getToken(),
            udata: insertRecord});
    }catch(err){
        next(err);
    }
}

  const login = async (req, res, next)=>{
    try{
        const {phone, studentid} = req.body;
        // let's check mobile number
        const userExits = await Student.findOne({phone: phone});
        if(!userExits){
          return res.status(400).json({message: 'Invalid login credentials!'})
        } 
        
        if(userExits.studentid==studentid){
            res.status(200).json({message: 'credential matched', token: await userExits.getToken(), 
                userId: userExits._id.toString()});
        }else{
            res.status(400).json({message: 'invalid mobile number or student id'})
        }

    }catch(err){
        next(err)
    }
  }

  const cuser = async (req, res, next)=>{
    try{
        const user = req.user;
        const token = req.token;
        res.status(200).json({udata: user})
    }catch(err){
        next(err)
    }
  }

const updateuser = async(req, res, next)=>{
    try{
        const d = req.body;
        const op = await Student.updateOne({_id: d.uid}, {$set: {name:d.name, face:d.face, dob:d.dob, 
            fname:d.fname , mname:d.mname , village: d.village, postcode:d.postcode , upazilla: d.upazilla , zilla: d.zilla , email: d.email , phone:d.phone , institute: d.institute , session: d.session , 
            classref: d.classref , deparmentref: d.deparmentref } });
            if(!op){
                return res.status(401).json({message:'update faild!'});
            }
            res.status(201).json({message:"updated"});

    }catch(err){
        next(err)
    }
}

const test = async (req, res, next)=>{
    try{
        const data = req.body;
        const testCreated = await Test.create(data);
        console.log(`all right ${testCreated} `)
        res.status(200).json({message: 'save data', data: testCreated});
    }catch(err){
        next(err)
    }
}

module.exports = {home, register, login, cuser, updateuser, test,}