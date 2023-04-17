const Task = require('../database/models/Task');

const getAllTasks = (req, res) => {
    res.send('all tasks from controller');
}
const createTask = async (req, res,) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(400).send("Send proper request da");
    }
}
const getSingleTask = (req, res) => {
    res.send('get single task from controller for id ' + req.params.id);
}
const updateTask = (req, res) => {
    res.send('update task from controller for id ' + req.params.id);
}
const deleteTask = (req, res) => {
    res.send('delete task from controller for id ' + req.params.id);
}


module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
};