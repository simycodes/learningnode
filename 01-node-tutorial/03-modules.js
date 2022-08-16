// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

//This will use variables from 04-names file and method from 05-utils which are regarded
// as modules.These variables and method are exported and will need to be imported using the
//require global variable

const names = require('./04-names');
//importing exported variables and putting them in a variable called names using the require
//global variable.require uses the path of the module/file to get the exported variables or 
//methods.

//console.log(names);
const sayHi = require('./05-utils');

sayHi('Simy');
sayHi(names.simon);
sayHi(names.peter);

const data = require('./06-alternative-flavor');
console.log(data);

require('./07-mind-grenade');
// A module is directly called when its required/imported,meaning any 
// called function in an imported module will give its results in the importing
// file or module