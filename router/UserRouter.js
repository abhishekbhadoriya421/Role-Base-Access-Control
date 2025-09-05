const Router = require('express').Router();
// const { UserAuthCheck } = require('../middleware/UserAuthCheckMiddleware');
const { VerifyUserMemebership } = require('../middleware/CheckUserMembership');
const { AddUserAction, CreateUserAction, UpdateUserAction, UpdateUserFormAction, DeleteUserAction } = require('../controller/UserController');



Router.get('/add-user', VerifyUserMemebership, AddUserAction);
Router.get('/update-user-form', VerifyUserMemebership, UpdateUserFormAction);
Router.get('/delete-user', VerifyUserMemebership, DeleteUserAction);

// Post 
Router.post('/create-user', VerifyUserMemebership, CreateUserAction);
Router.post('/update-user', VerifyUserMemebership, UpdateUserAction);

module.exports = Router