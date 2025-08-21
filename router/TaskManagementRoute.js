const Router = require('express').Router();
const { CreateTaskFormAction, ViewTaskListAction, CreateTaskAction } = require('../controller/TaskManagementController');

Router.get('/create-task-form', CreateTaskFormAction);
Router.get('/view-task-list', ViewTaskListAction);

Router.post('/create-task', CreateTaskAction);


module.exports = Router;