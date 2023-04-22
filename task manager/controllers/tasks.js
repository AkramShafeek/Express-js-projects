const Task = require('../database/models/Task');

const getAllTasks = async (req, res) => {
    try {
        let tasks = await Task.find();
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        res.status(500).send({ response: "couldn't fetch data from db", error: error });
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(400).send("Send proper request da");
    }
}
const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });

        if (!task)
            return res.status(404).json({ msg: `No task with id : ${req.params.id}` });

        res.status(200).json({ task });
    } catch (error) {
        res.status(400).send("Send proper request da");
    }
}
const updateTask = (req, res) => {
    res.send('update task from controller for id ' + req.params.id);
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id });

        if (!task)
            return res.status(404).json({ msg: `No task with id : ${req.params.id}` });

        res.status(200).json({ task });
    } catch (error) {
        res.status(400).send("Send proper request da");
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
};