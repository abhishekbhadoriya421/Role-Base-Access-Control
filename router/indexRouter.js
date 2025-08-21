const Router = require('express').Router();
const { DashboardAction } = require('../controller/UserController');
const authRouter = require('./AuthRouter');
const userRouter = require('./UserRouter');
const authRolePermissionMapRouter = require('./AuthRolePermissionRouter');
const taskManagementRouter = require('./TaskManagementRoute');
const { UserAuthCheckWithJWT } = require('../middleware/UserAuthCheckMiddleware');
const { CheckAdminUserTypeMiddleware } = require('../middleware/CheckAdminUserTypeMiddleware');


// Get
Router.get('/', (req, res) => { res.redirect('/dashboard') })
Router.get('/dashboard', UserAuthCheckWithJWT, DashboardAction);


//Router
Router.use('/user', CheckAdminUserTypeMiddleware, userRouter);
Router.use('/auth', authRouter);
Router.use('/task-management', UserAuthCheckWithJWT, taskManagementRouter);
Router.use('/role-permission', authRolePermissionMapRouter);


module.exports = Router