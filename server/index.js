require('dotenv').config();
const express = require('express');
const cors = require('cors');
// export component
// database configuration
const dbConn = require('./utils/db')
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
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}))
app.use(express.json())
// use router
app.use('/api/auth', authRouter);
app.use('/api/exam', examRouter);
app.use('/api/admin', adminRouter);

// app error
app.use(errorMiddleware)

const PORT = process.env.PORT;
dbConn().then( ()=>{
    app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
    });
})



