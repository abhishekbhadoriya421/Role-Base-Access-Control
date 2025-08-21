const TaskList = require('../models/TaskList.js');
const CoreUser = require('../models/CoreUser.js');


exports.ViewTaskListAction = async (req, res) => {
    const taskList = await TaskList.find().sort({ _id: -1 }).populate('task_assigned_to');
    // return res.json(taskList);
    return res.status(200).render('task-management/view-task-list', {
        'taskList': taskList
    });
}

exports.CreateTaskFormAction = async (req, res) => {
    const model = new TaskList();
    const users = await CoreUser.find({ status: 'Active' }).select('_id user_name user_email').lean();
    return res.status(200).render('task-management/create-task-form', {
        'model': model,
        'users': users
    });
}

exports.CreateTaskAction = async (req, res) => {
    const { task_name, task_description, task_status, task_priority, task_assigned_to, due_date } = req.body;

    const model = new TaskList();
    model.task_name = task_name;
    model.task_description = task_description;
    model.task_status = task_status;
    model.task_priority = task_priority;
    model.task_assigned_to = task_assigned_to;
    model.due_date = due_date;

    try {
        await model.save();
        req.flash('success_msg', 'Task Has Been Created SuccessFully');
        return res.status(200).redirect('view-task-list');
    } catch (err) {

    }
}



