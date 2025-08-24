const Router = require('express').Router();
// const { UserAuthCheck } = require('../middleware/UserAuthCheckMiddleware');
const { VerifyUserMemebership } = require('../middleware/CheckUserMembership');
const { AddUserAction, CreateUserAction, UpdateUserAction, UpdateUserFormAction, DeleteUserAction } = require('../controller/UserController');



Router.get('/add-user', VerifyUserMemebership, AddUserAction);
Router.get('/update-user-form', UpdateUserFormAction);
Router.get('/delete-user', DeleteUserAction);

// Post 
Router.post('/create-user', CreateUserAction);
Router.post('/update-user', UpdateUserAction);

module.exports = Router