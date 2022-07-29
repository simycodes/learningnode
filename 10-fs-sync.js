const { readFileSync, writeFileSync } = require('fs')
console.log('start')

//readFileSync is used to read or display text found in a file stored on a computer
//uses the location or path of the file and the type to read it as the arguments
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

//display text from a file
console.log(first, second);

//writeFileSync is used to create a new file,uses location to store file and what to store in the
//file as arguments.If file already exists,only the new text will be overidden, use an extra
//argument {flag: a} object, so the new text can be added or appended to the already existing file
writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' }
)

const newlyCreatedFile = readFileSync('./content/result-sync.txt', 'utf8');
console.log(newlyCreatedFile);

console.log('done with this task')
console.log('starting the next one')
