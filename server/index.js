require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require("multer");
const fs = require('fs');
// database configuration
const dbConn = require('./utils/db')
// get model
const Student = require('./models/student-model')
// import error middleware
const errorMiddleware = require('./middleware/error-middleware')
// import router
const authRouter = require('./route/auth-router')
const examRouter = require('./route/live-router')
const adminRouter = require('./route/admin-router')

const app = express();
// application setting.
app.use(cors({
    origin:'*', // http://localhost:5173
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))
app.use(express.json())
// use router
app.use('/api/auth', authRouter);
app.use('/api/exam', examRouter);
app.use('/api/admin', adminRouter);
// coustom route.
const dirsimg = "../client/src/images/students/";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dirsimg);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  app.post('/upload-image',upload.single("image"), async(req, res)=>{
    try{
        const uid = req.header('uid');
        if(!uid) return res.status(402).json({message:'unauthprovided'})
        const imageName = req.file.filename;
        // step 1, check and removed.
        const check = await Student.findOne({_id:uid});
        if(!check) return res.status(401).json({message:'invalid user!'})
        if(check.face!='face') fs.unlinkSync(`${dirsimg}${check.face}`)    
        // step 2, updated specify student credentials.
        const updated = await Student.updateOne({_id:uid }, {$set: {face: imageName} })
        // step 3, show message.
        if(!updated) return res.status(400).json({message:'image is not updated!'})
        res.status(201).json({message:'image is updated successfully now.'})
    }catch(err){
        console.log(`server error ${err}`)
    }
  });
// coustom route.
// app error
app.use(errorMiddleware)

const PORT = process.env.PORT;
dbConn().then( ()=>{
    app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
    });
})



