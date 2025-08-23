const Role = require('../models/Role.js');
const RolePermissionMap = require('../models/RolePermissionMap.js');
const Permission = require('../models/Permission.js');
const CoreUser = require('../models/CoreUser.js');
const Memberships = require('../models/Memberships .js');

module.exports.AddRoleFormAction = async (req, res) => {
    return res.status(200).render('auth/add-role-form');
}

module.exports.ViewRolesAction = async (req, res) => {
    const roles = await Role.find().lean();

    return res.status(200).render('auth/view-role', {
        'roles': roles
    });
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
        console.log(err)
    }

}


module.exports.AddPermissionForm = async (req, res) => {
    return res.status(200).render('auth/add-permission-form');
}

module.exports.ViewPermissionAction = async (req, res) => {
    const roles = await Permission.find().lean();

    return res.status(200).render('auth/view-role', {
        'roles': roles
    });
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
    const users = await CoreUser.find().lean();

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
    console.log(membership)
    return res.status(200).render('auth/view-user-role-assigned-list', {
        'membership': membership
    });
}