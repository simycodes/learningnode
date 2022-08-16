const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next();
    //next help pass the program running from logger middleware to the other methods get method
    //always put next() at end of every middleware method unless u ending the middleware with
    //message being sent to the website such as res.send('About')
}

//This is a default export
module.exports = logger