const Router = require('express').Router();
const { VerifyUserMemebership } = require('../middleware/CheckUserMembership');

const { CreateTaskFormAction, ViewTaskListAction, CreateTaskAction } = require('../controller/TaskManagementController');

Router.get('/create-task-form', VerifyUserMemebership, CreateTaskFormAction);
Router.get('/view-task-list', VerifyUserMemebership, ViewTaskListAction);

Router.post('/create-task', VerifyUserMemebership, CreateTaskAction);


module.exports = Router;