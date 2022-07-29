const os = require('os'); // os is an inbuilt js module no need to use /. before it
// os now has all methods and properties from the os module

console.log(os.version());
console.log(`The system uptime is ${os.uptime()} seconds`);

// info about current user
const user = os.userInfo()
console.log(user)

// method returns the system uptime in seconds
//console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
console.log(currentOS);
