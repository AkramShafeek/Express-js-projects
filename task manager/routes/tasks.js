const express = require('express');
const router = express.Router();

const {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post((req,res)=>{createTask(req,res,"akram")});

router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;