//initializing an installed or third party dependency
const _ = require('lodash');

const items = [1, [2,[3,[4]]]]
const newItems = _.flattenDeep(items); //this will put all numbers in a single array

console.log(newItems);