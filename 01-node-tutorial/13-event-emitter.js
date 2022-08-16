// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods,on - listens for events/creates events,emit - emits/displays the events
// keep track of the order
// additional arguments
// built-in modules utilize it

customEmitter.on('response', (name, id) => { //creating event called response using on event
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'john', 34) //calling the event response

//many different methods can be created for the same event
//we first create the event and then emit the event