const {CustomAPIError} =  require('../errors/custom-error');

const errorHandlerMiddleWare = (err, req, res, next) => {
    //console.log(err);
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({ msg:'Something went wrong,please try again' });
    //This handles the error coming from the next(error); in the asyncWrapper()/async.js

    //alternative way of printing the errors
    //return res.status(500).json({msg:"Something went wrong, Please try again later"});
}

module.exports =  errorHandlerMiddleWare