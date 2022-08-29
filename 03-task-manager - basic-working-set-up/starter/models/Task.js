const mongoose = require('mongoose');

//Schema helps make documents/rows to have the same datatype in each collection/table
const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,'must provide the name'],
        trim: true,
        maxlength: [20,'name can not be more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false,
    }
});


//Basic setup without validators
// const TaskSchema = mongoose.Schema({
//     name:String,
//     completed:Boolean
// });

module.exports = mongoose.model('Task', TaskSchema);
//Task is called a model,created by the TaskSchema.Hence model is just a reflection of a schema
