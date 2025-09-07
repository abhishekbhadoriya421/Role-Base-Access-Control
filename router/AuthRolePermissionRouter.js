const Router = require('express').Router();
const {
    AddRoleFormAction,
    CreateRoleAction,
    ViewRolesAction,
    AddPermissionForm,
    ViewPermissionAction,
    CreatePermissionAction,
    RoleMapAction,
    CreateRoleMapAction,
    ViewRolePermissionMapAction,
    AssignUserRoleFormAction,
    AssignUserRoleAction,
    ViewUserRoleAssignedListAction,
    IndexAction,
    DeletePermissionAction,
    UpdatePermissionFormAction,
    UpdatePermissionAction,
    DeleteRoleAction,
    UpdateRoleFormAction,
    UpdateRoleAction,
    UpdateRolePermissionMapFormAction,
    UpdateRolePermissionMapAction,
    DeleteRolePermissionMapAction
} = require('../controller/AuthController.js');

// Get
Router.get('/', (req, res) => { res.redirect('index') });
Router.get('/index', IndexAction);
Router.get('/add-role-form', AddRoleFormAction);
Router.get('/view-role', ViewRolesAction);
Router.get('/view-permission', ViewPermissionAction);
Router.get('/add-permission-form', AddPermissionForm);
Router.get('/role-map-form', RoleMapAction);
Router.get('/view-role-permission-map', ViewRolePermissionMapAction);
Router.get('/assign-user-role-form', AssignUserRoleFormAction);
Router.get('/view-user-role-assigned-list', ViewUserRoleAssignedListAction);

Router.post('/create-role', CreateRoleAction);
Router.post('/create-permission', CreatePermissionAction);
Router.post('/create-role-permissions', CreateRoleMapAction);
Router.post('/assign-user-role', AssignUserRoleAction);
Router.post('/delete-permission', DeletePermissionAction);
Router.post('/update-permission-form', UpdatePermissionFormAction);
Router.post('/update-permission', UpdatePermissionAction);
Router.post('/delete-role', DeleteRoleAction);
Router.post('/update-role-form', UpdateRoleFormAction);
Router.post('/update-role', UpdateRoleAction);
Router.post('/update-role-permission-map-form', UpdateRolePermissionMapFormAction);
Router.post('/update-role-permissions-map', UpdateRolePermissionMapAction);
Router.post('/delete-role-permissions-map', DeleteRolePermissionMapAction);



module.exports = Router;