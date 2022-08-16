const authorize = (req,res,next) =>{
    //we using the query string to get the name of the user
    //to see this functionality use this url http://localhost:5000/?user=john
    const { user } = req.query;
    if(user === 'john'){
        req.user = {name:'john',id:3}
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
}


module.exports = authorize