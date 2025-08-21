const Router = require('express').Router();
const { AddRoleFormAction, CreateRoleAction, ViewRolesAction, AddPermissionForm, ViewPermissionAction, CreatePermissionAction } = require('../controller/AuthController.js');

// Get
Router.get('/add-role-form', AddRoleFormAction);
Router.get('/view-role', ViewRolesAction);
Router.get('/view-permission', ViewPermissionAction);
Router.get('/add-permission-form', AddPermissionForm);

Router.post('/create-role', CreateRoleAction);
Router.post('/create-permission', CreatePermissionAction);



module.exports = Router;