// GLOBALS  - NO WINDOW -NO WINDOW OBJECT,CANT ACCESS USING QUERY SELECTORS !!!!

//Below are examples of node global variables - like php globals
// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(__dirname);
setInterval(()=>{console.log('function called every 2 second')}, 2000)
setTimeout(()=> {console.log('called after 3 seconds')}, 3000)
//console.log(__filename);
//console.log(require);
//console.log(module);
//console.log(process);


