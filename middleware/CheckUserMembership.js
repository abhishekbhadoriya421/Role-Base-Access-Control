const { Verify_JWT_Token } = require('../servies/AuthServices');
const Memberships = require('../models/Memberships.js');
const RolePermissionMap = require('../models/RolePermissionMap.js');
const Permission = require('../models/Permission.js');
const CacheService = require('../servies/CacheService');

const membershipCache = {};
const rolePermissionMapCache = {};
const permissionIdsCaches = {};

/**
 * Verify the user membership (user allowed to vist the page or not with proper chache mechanism)
 */
const VerifyUserMemebership = async (req, res, next) => {
    const referer = req.get("Referer");
    if (!req.cookies || !req.cookies.access_token || !req.cookies.access_token.token) {
        return res.redirect('/auth/login');
    }
    /**
     * Validate Token and user authentication 
     */
    const token = req.cookies.access_token.token;
    if (!token) {
        req.flash('error_msg', 'Please login to continue');
        return res.redirect('/auth/login');
    }
    const decoded = Verify_JWT_Token(token);
    const user_id = decoded.id
    let role_ids = [];

    /**
     * Get user role if saved in cache fetch from cache else make db query
     * */
    // if (!membershipCache[user_id]) {
    //     const membershipModel = await Memberships.distinct('role_id', { user_id: user_id }).lean();
    //     role_ids = membershipModel;
    //     membershipCache[user_id] = membershipModel;
    // } else {
    //     role_ids = membershipCache[user_id];
    // }

    /**
     * cache data using redis
     */

    let roleIds = await CacheService.getCache(user_id);
    console.log("get from redis ", roleIds)
    if (!roleIds) {
        console.log("Role Id not found");
        const modelId = await Memberships.distinct('role_id', { user_id: user_id }).lean();
        if (!modelId) { console.log("You don't have assigned any role"); return res.redirect(referer || '/'); }
        roleIds = await CacheService.setCache(user_id, modelId, 3600);
        console.log("Role Id Has been Set : ", roleIds);
    }
    /**
     * get permission id from requested url if cached fetch from there else fetch from db
     */
    let permissionObjectId = null
    const requestedUrl = req.baseUrl + req.path;
    if (!permissionIdsCaches[requestedUrl]) {
        permissionObjectId = await Permission.findOne({ name: requestedUrl }).select('_id').lean();
        if (!permissionObjectId) {
            return res.redirect(referer || '/');
        }
        permissionIdsCaches[requestedUrl] = permissionObjectId;
    } else {
        permissionObjectId = permissionIdsCaches[requestedUrl];
    }

    /**
     * check if user is authorized to visit the request page  
     */
    let authorizedUser = false;
    for (const roleId of roleIds) {
        if (!rolePermissionMapCache[roleId]) {
            const permissions = await RolePermissionMap.distinct('permission_id', { role_id: roleId }).lean();
            rolePermissionMapCache[roleId] = permissions.map(p => p.toString());
        }
        if (rolePermissionMapCache[roleId].includes(permissionObjectId._id.toString())) {
            authorizedUser = true;
            break;
        }
    }

    if (authorizedUser == true) {
        next()
    } else {
        return res.redirect(referer || '/');
    }

}

module.exports = {
    VerifyUserMemebership: VerifyUserMemebership
}