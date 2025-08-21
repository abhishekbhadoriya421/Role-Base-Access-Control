const Router = require('express').Router();
const { AddRoleFormAction, CreateRoleAction, ViewRolesAction, AddPermissionForm } = require('../controller/AuthController.js');

// Get
Router.get('/add-role-form', AddRoleFormAction);
Router.get('/view-role', ViewRolesAction);
Router.get('/add-permission-form', AddPermissionForm);

Router.post('/create-role', CreateRoleAction);


module.exports = Router;