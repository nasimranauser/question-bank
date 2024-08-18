
const validate = (schema) => async (req, res, next)=>{
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }catch(err){
        // parse error, or send error.
        const status = 402;
        const message = err.errors[0].message;
        const extraDetails = "User authonticate Error!";
        const error = {
            status, message, extraDetails,
        }
        console.log('auth middleware error: ', err);
        next(error);
        //res.status(400).json(error)
    }
}

module.exports = validate;