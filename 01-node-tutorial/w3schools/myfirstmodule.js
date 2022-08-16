exports.myDateTime = function () {
    return Date();
};

//Use the exports keyword to make properties and methods available outside the module file.

//name of the file myfirstmodule becomes the module name and mydateTime is the function being accessed
//in the module

//var dt = require('./myfirstmodule');
//res.write("The date and time are currently: " + dt.myDateTime());