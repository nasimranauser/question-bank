const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const { required } = require('../validators/test-validator');

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    face: {
        type:String,
    },
    dob: { 
        type:String,
        required:true,
    },
    fname: {
        type:String,
        required:true,
    },
    mname: {
        type:String,
        required:true,
    },
    studentid: {
      type:String,
      required:true,  
    },
    village: {type:String, required:true},
    postcode: {type:String, required:true},
    upazilla: {type:String, required:true},
    zilla: {type:String, required:true},
    email: {type:String,required:true},
    phone: {type:String, required:true},
    institute: {type:String, required:true},
    session: {type:String, required:true},
    classref: {type:String, required:true},
    deparmentref: {type:String, required:true},
    ipaddress: {type:String, required:true},
    devicelocation: {type:String, required:true},
    joindate: {
        type:String,
       default: Date(),
    },
    verified: {
        type:Boolean,
        default:false,
    },
    cstatus: {
        type:String,
        default: false,
    },
    createat: {
        type:Date,
        default: Date()
    }
});

studentSchema.pre('save', async function(){
    const student = this;
    if(!student.isModified('studentid')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(student.studentid, saltRound);
        student.studentid = hash;
    }catch(err){next(err)}
});

studentSchema.methods.getToken = async function(){
    try{
        return Jwt.sign({
            userId: this._id.toString(),
            isVerified: this.verified,
            cstatus: this.cstatus
        },
    process.env.JWT_SECRET, {expiresIn:'30d'}
    )
    }catch(err){
        console.error('token generating error!')
    }
}

const Student = mongoose.model('EStudent', studentSchema);
module.exports = Student;

