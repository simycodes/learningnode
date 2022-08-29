const Task = require('../models/Task');

 
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } 
    catch (error) {
        res.status(500).json({ msg:error });
    }
}

const getTask = async (req,res) => {
    try {
       const { id: taskID } = req.params;  //taskID is an alias of id.params holds the id values
       const task = await Task.findOne({_id: taskID});
       //if selected task is not available
       if(!task){
        return res.status(404).json({ msg: `No task with id :  ${task}`});
       }
       res.status(200).json({ task });
    } 
    catch (error) {
        res.status(500).json({ msg: error});
    }
}

const createTask = async (req,res) => { 
    try {
        const task = await Task.create(req.body); 
        //Model/schemas(Task) is used in creating an item in the db,and general schema method called
        //create,is used to accomplish this,the schema controls the structure of what is created in the
        //db The schema makes sure what user gives is accurate and corresponds to db structure
        res.status(201).json({ task });    
    } 
    catch (error) {
        res.status(500).json({ msg:error });
    } 
}

const deleteTask = async (req, res) => {
    try {
        const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        //if selected task is not available
        if(!task){
           return res.status(404).json({ msg: `No task with id :  ${task}`});
        }
        res.status(200).json({ task });
        //other ways to respond to a delete request
        //res.status(200).send();
        //res.status(200).json({ task:null, status: 'success,deleted successfully' });
    } 
    catch (error) {
        res.status(500).json({ msg: error });
    }
}

const updateTask = async (req,res) => {
    try {
        //get id of the item to be updated to verify it
        const { id:taskID } = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body, 
            {new:true,runValidators:true}); 
            //the new:true&runValidators helps send back the updated new info in the db

        if(!task){
            return res.status(404).json({ msg: `No task with id :  ${task}`});
        }
        res.status(200).json({ task });
        //This will display the data that needs to be updated
        //res.status(200).json({ id:taskID, data:req.body});

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

//Basic controller structures
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

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };