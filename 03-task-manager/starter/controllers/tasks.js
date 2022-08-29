const Task = require('../models/Task');
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
 
const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
        //other ways of responding to user requests
        //res.status(200).json({ tasks,amount:tasks.length });
        //res.status(200).json({ success:true,data:{tasks,nbHits:tasks.length} });
        //res.status(200).json({ status:"success",data:{tasks,nbHits:tasks.length} });
        res.status(500).json({ msg:error });
        //res.status(500).json({ status:"failed"});
})

const getTask = asyncWrapper(async (req, res, next) => {
       const { id: taskID } = req.params;  //taskID is an alias of id.params holds the id values
       const task = await Task.findOne({_id: taskID});
       //if selected task is not available
       if(!task){
        //creating and passing own error to the error-handler middleware if task is not there
        return next(createCustomError(`No task with id :  ${task}`,404));
        //next() coming as argument helps pass data/methods to the next middleware,in this case
        //the error-handle,so it can handle the error found in this if block

        //Alternative code to handle error
        // const error = new Error('Not Found');
        // error.status = 404;
        // return next(error);
         //return res.status(404).json({ msg: `No task with id :  ${task}`});
       }
       res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req,res) => { 
        const task = await Task.create(req.body); 
        //Model/schemas(Task) is used in creating an item in the db,and general schema method called
        //create,is used to accomplish this,the schema controls the structure of what is created in the
        //db The schema makes sure what user gives is accurate and corresponds to db structure
        res.status(201).json({ task });    
});

const deleteTask = asyncWrapper(async (req, res) => {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        //if selected task is not available
        if(!task){
            return next(createCustomError(`No task with id :  ${task}`,404));
        }
        res.status(200).json({ task });
        //other ways to respond to a delete request
        //res.status(200).send();
        //res.status(200).json({ task:null, status: 'success,deleted successfully' });
});

const updateTask = asyncWrapper(async (req,res) => {
        //get id of the item to be updated to verify it
        const { id:taskID } = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body, 
            {new:true,runValidators:true}); 
            //the new:true&runValidators helps send back the updated new info in the db
        if(!task){
             return next(createCustomError(`No task with id :  ${task}`,404));
        }
        res.status(200).json({ task });
        //This will display the data that needs to be updated
        //res.status(200).json({ id:taskID, data:req.body});
});

//This is a put request,the above request is a patch
const editTask = asyncWrapper(async (req,res) => {
        //get id of the item to be updated to verify it
        const { id:taskID } = req.params;
        const task = await Task.findByIdAndUpdate({_id:taskID},req.body, 
            {new:true,runValidators:true,overwrite:true}); 
            //overwrite:true makes sure that the other not updated data is removed 
        if(!task){
            return res.status(404).json({ msg: `No task with id :  ${task}`});
        }
        res.status(200).json({ task });
        //This will display the data that needs to be updated
        //res.status(200).json({ id:taskID, data:req.body});
});



//INTERMEDIATE CONTROLLER STRUCTURES

// const getAllTasks = asyncWrapper(async (req, res) => {
//         const tasks = await Task.find({});
//         res.status(200).json({ tasks });
//         //other ways of responding to user requests
//         //res.status(200).json({ tasks,amount:tasks.length });
//         //res.status(200).json({ success:true,data:{tasks,nbHits:tasks.length} });
//         //res.status(200).json({ status:"success",data:{tasks,nbHits:tasks.length} });
//         res.status(500).json({ msg:error });
//         //res.status(500).json({ status:"failed"});
// })

// const getTask = asyncWrapper(async (req,res) => {
//        const { id: taskID } = req.params;  //taskID is an alias of id.params holds the id values
//        const task = await Task.findOne({_id: taskID});
//        //if selected task is not available
//        if(!task){
//         return res.status(404).json({ msg: `No task with id :  ${task}`});
//        }
//        res.status(200).json({ task });
// });

// const createTask = asyncWrapper(async (req,res) => { 
//         const task = await Task.create(req.body); 
//         //Model/schemas(Task) is used in creating an item in the db,and general schema method called
//         //create,is used to accomplish this,the schema controls the structure of what is created in the
//         //db The schema makes sure what user gives is accurate and corresponds to db structure
//         res.status(201).json({ task });    
// });

// const deleteTask = asyncWrapper(async (req, res) => {
//         const { id:taskID } = req.params;
//         const task = await Task.findOneAndDelete({ _id: taskID });
//         //if selected task is not available
//         if(!task){
//            return res.status(404).json({ msg: `No task with id :  ${task}`});
//         }
//         res.status(200).json({ task });
//         //other ways to respond to a delete request
//         //res.status(200).send();
//         //res.status(200).json({ task:null, status: 'success,deleted successfully' });
// });

// const updateTask = asyncWrapper(async (req,res) => {
//         //get id of the item to be updated to verify it
//         const { id:taskID } = req.params;
//         const task = await Task.findOneAndUpdate({_id:taskID},req.body, 
//             {new:true,runValidators:true}); 
//             //the new:true&runValidators helps send back the updated new info in the db
//         if(!task){
//             return res.status(404).json({ msg: `No task with id :  ${task}`});
//         }
//         res.status(200).json({ task });
//         //This will display the data that needs to be updated
//         //res.status(200).json({ id:taskID, data:req.body});
// });

// //This is a put request,the above request is a patch
// const editTask = asyncWrapper(async (req,res) => {
//         //get id of the item to be updated to verify it
//         const { id:taskID } = req.params;
//         const task = await Task.findByIdAndUpdate({_id:taskID},req.body, 
//             {new:true,runValidators:true,overwrite:true}); 
//             //overwrite:true makes sure that the other not updated data is removed 
//         if(!task){
//             return res.status(404).json({ msg: `No task with id :  ${task}`});
//         }
//         res.status(200).json({ task });
//         //This will display the data that needs to be updated
//         //res.status(200).json({ id:taskID, data:req.body});
// });


//BASIC  CONTROLLER STRUCTURES

// const getAllTasks = (req,res) => {
//     res.send('get all tasks');
// }
// const getTask = (req,res) => {
//     res.json({id: req.params.id})
// }
// const createTask = (req,res) => {
//     res.json(req.body)
// }
// const updateTask = (req,res) => {
//     res.send('update task')
// }
// const deleteTask = (req,res) => {
//     res.send('deleteTask')
// }

module.exports = { getAllTasks, createTask, getTask, updateTask, editTask, deleteTask };