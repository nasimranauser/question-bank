const mongoose = require('mongoose');

// import db conn function

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`databse configuration success`)
    }catch(err){
        console.log(`database configuration faild!`)
        process.exit(0);
    }
}

module.exports = dbConnection;