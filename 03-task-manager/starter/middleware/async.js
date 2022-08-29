//This middle ware function handles all the try and catch code  that is used in each
//controller that is used.Its a form of refactoring the code
const asyncWrapper = (fn) => {
    return async(req,res,next) =>{
        try {
            await fn(req,res,next);
        } catch (error) {
            next(error);
            //next passes error to the next available middleware
        }
    }

}

module.exports =  asyncWrapper