const express = require('express');
const router = express.Router();

const { getAllTasks, createTask, getTask, updateTask, editTask, deleteTask } = require("../controllers/tasks")

router.route('/').get(getAllTasks);
router.route('/').post(createTask);

router.route('/:id').get(getTask);
router.route('/:id').patch(updateTask);
router.route('/:id').put(editTask);

//router.route('/:id').delete(deleteTask);
router.delete('/:id', deleteTask);

module.exports = router