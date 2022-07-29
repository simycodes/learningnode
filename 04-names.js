// local
const secret = 'SUPER SECRET'
// share
const simon ='Simon';
const peter = 'Peter';

console.log(module); //this will show that this file(04-names/module) has an export object that
// we can use to export variables and methods defined in this file or module
//NOTE:module is a global variable -can be used in every file or module

module.exports = { simon, peter }
//module as global object variable,exports as object property used to export variable of a file or
//module
//NOTE:By doing this we making the variables simon and peter to be available globally or everywhere
//in the program and they can be accessed by using another global variable called require,in a file
//or module that we want to use these exported variables simon and peter

console.log(module);
