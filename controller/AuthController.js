const Role = require('../models/Role.js');
const RolePermissionMap = require('../models/RolePermissionMap.js');
const Permission = require('../models/Permission.js');

module.exports.AddRoleFormAction = async (req, res) => {
    return res.status(200).render('auth/add-role-form');
}

module.exports.ViewRolesAction = async (req, res) => {
    const roles = await Role.find();

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
    const roles = await Permission.find();

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
