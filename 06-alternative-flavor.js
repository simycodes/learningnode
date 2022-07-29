const items = ['item1', 'item2'];

//direct exporting an array variable
module.exports.itemsTwo = ['item1', 'item2'];

const person = {
  name: 'Mule',
}

//alternative way of exporting an object
module.exports.singlePerson = person; 

//another alternative way of exporting an object
module.exports.person2 = { 
  name: 'Mule',
}
