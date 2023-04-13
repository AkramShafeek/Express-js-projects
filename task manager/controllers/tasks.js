const getAllTasks = (req,res) => {
    res.send('all tasks from controller');
}
const createTask = (req,res) => {
    res.send('create task from controller');
}
const getSingleTask = (req,res) => {
    res.send('get single task from controller');
}
const updateTask = (req,res) => {
    res.send('update task from controller');
}
const deleteTask = (req,res) => {
    res.send('delete task from controller');
}


module.exports = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
};