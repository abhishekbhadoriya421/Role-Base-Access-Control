const Role = require('../models/Role.js');
const RolePermissionMap = require('../models/RolePermissionMap.js');
const Permission = require('../models/Permission.js');
const LoginUser = require('../models/LoginUser.js');
const Memberships = require('../models/Memberships.js');


module.exports.IndexAction = async (req, res) => {
    return res.status(200).render('auth/index');
}


module.exports.ViewRolesAction = async (req, res) => {
    const roles = await Role.find().lean();
    return res.status(200).render('auth/view-role', {
        'roles': roles
    });
}

module.exports.AddRoleFormAction = async (req, res) => {
    return res.status(200).render('auth/add-role-form');
}

module.exports.CreateRoleAction = async (req, res) => {
    const { name, description } = req.body
    try {
        const model = new Role();
        model.name = name;
        model.description = description;

        await model.save()
        console.log("Saved Successfully");
        return res.redirect('view-role');
    } catch (err) {
        throw new Error(err.toString());
    }

}

module.exports.DeleteRoleAction = async (req, res) => {
    const { id } = req.body
    try {
        await Role.findByIdAndDelete({ '_id': id });
        console.log('Role Deleted Successfully');
    } catch (err) {
        console.log(err);
    }
    return res.redirect('/role-permission/view-role');
}

module.exports.UpdateRoleFormAction = async (req, res) => {
    const { id } = req.body
    try {
        const model = await Role.findOne({ '_id': id });
        if (!model) {
            return res.redirect('/role-permission/view-role')
        }
        return res.render('auth/update-role-form', {
            'model': model
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.UpdateRoleAction = async (req, res) => {
    const { id, name, description } = req.body;
    try {
        const response = await Role.findByIdAndUpdate(
            id,
            { 'name': name },
            { 'description': description }
        );
        return res.redirect('/role-permission/view-role')
    } catch (err) {
        console.log(err);
    }
}


module.exports.ViewPermissionAction = async (req, res) => {
    const permission = await Permission.find().lean();

    return res.status(200).render('auth/view-permission', {
        'permission': permission
    });
}


module.exports.AddPermissionForm = async (req, res) => {
    return res.status(200).render('auth/add-permission-form');
}

module.exports.CreatePermissionAction = async (req, res) => {
    const { name, description } = req.body
    try {
        const model = new Permission();
        model.name = name;
        model.description = description;
        await model.save()
        console.log("Saved Successfully");
        return res.redirect('view-permission');
    } catch (err) {
        console.log(err)
    }

}

module.exports.DeletePermissionAction = async (req, res) => {
    const { id } = req.body
    try {
        await Permission.findByIdAndDelete({ '_id': id });
        console.log('Deleted Successfully');
    } catch (err) {
        console.log(err);
    }
    return res.redirect('/role-permission/view-permission');
}


module.exports.UpdatePermissionFormAction = async (req, res) => {
    const { id } = req.body
    try {
        const model = await Permission.findOne({ '_id': id });
        if (!model) {
            return res.redirect('/role-permission/view-permission')
        }
        return res.render('auth/update-permission-form', {
            'model': model
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.UpdatePermissionAction = async (req, res) => {
    const { id, name, description } = req.body;
    try {
        const response = await Permission.findByIdAndUpdate(
            id,
            { 'name': name },
            { 'description': description }
        );
        return res.redirect('/role-permission/view-permission')
    } catch (err) {
        console.log(err);
    }
}

module.exports.RoleMapAction = async (req, res) => {
    const roles = await Role.find().lean();
    const permission = await Permission.find().lean();
    return res.status(200).render('auth/role-map-form', {
        'permissions': permission,
        'roles': roles
    });
}


module.exports.CreateRoleMapAction = async (req, res) => {
    const { permission_id, role_id } = req.body
    try {
        const model = new RolePermissionMap();

        model.permission_id = permission_id
        model.role_id = role_id
        await model.save()
        console.log('Role Map Saved Successfully');
        return res.status(200).redirect('view-role-permission-map')
    } catch (err) {
        console.log(err);
    }

}

module.exports.ViewRolePermissionMapAction = async (req, res) => {
    const model = await RolePermissionMap.find().populate('permission_id').populate('role_id').lean();
    return res.status(200).render('auth/view-role-permission-map', {
        'rolePermissions': model
    });
}


module.exports.AssignUserRoleFormAction = async (req, res) => {
    const roles = await Role.find().lean();
    const users = await LoginUser.find().lean();

    return res.render('auth/assign-user-role-form.ejs', {
        'users': users,
        'roles': roles
    });
}


module.exports.AssignUserRoleAction = async (req, res) => {
    const { role_id, user_id } = req.body;
    if (!role_id || !user_id) {
        console.log('Role and user must select');
        return res.redirect('assign-user-role-form');
    }

    try {
        const model = new Memberships();
        model.user_id = user_id;
        model.role_id = role_id;
        await model.save();
        console.log('Successfully saved');
        return res.redirect('view-user-role-assigned-list');
    } catch (err) {
        console.log(err)
    }

}


module.exports.ViewUserRoleAssignedListAction = async (req, res) => {
    const membership = await Memberships.find().populate('user_id').populate('role_id').lean();
    return res.status(200).render('auth/view-user-role-assigned-list', {
        'membership': membership
    });
}