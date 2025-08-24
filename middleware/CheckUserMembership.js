const { Verify_JWT_Token } = require('../servies/AuthServices');
const Memberships = require('../models/Memberships.js');

const membershipCache = {};
const rolePermissionMapCache = {};

const VerifyUserMemebership = async (req, res, next) => {
    const referer = req.get("Referer");
    if (!req.cookies || !req.cookies.access_token || !req.cookies.access_token.token) {
        return res.redirect('/auth/login');
    }
    const token = req.cookies.access_token.token;
    if (!token) {
        req.flash('error_msg', 'Please login to continue');
        return res.redirect('/auth/login');
    }
    const decoded = Verify_JWT_Token(token);
    const user_id = decoded.id
    let role_ids = [];
    if (!membershipCache.user_id) {
        const membershipModel = await Memberships.distinct('role_id', { user_id: user_id }).lean();
        role_ids = membershipModel;
        membershipCache.user_id = membershipModel;
    } else {
        role_ids = membershipCache.user_id;
    }

    const requestedUrl = req.originalUrl;
    console.log(requestedUrl);
    next()

}

module.exports = {
    VerifyUserMemebership: VerifyUserMemebership
}