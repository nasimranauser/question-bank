

// error middleware
const errorMiddleware = (err, req, res, next)=>{
    const status = err.status || 402;
    const message = err.message || "BACKEND ERROR";
    res.status(status).json({status, message});
}

module.exports = errorMiddleware;