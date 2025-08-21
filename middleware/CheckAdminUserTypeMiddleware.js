const Verify_JWT_Token = require('../servies/AuthServices').Verify_JWT_Token;


/**
 * Only Admin View
 */
const CheckAdminUserTypeMiddleware = (req, res, next) => {
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
    if (!decoded || decoded.user_type !== 'admin') {
        req.flash('error_msg', 'Access denied. Admins only.');
        return res.redirect(referer || '/');
    }
    next();
}

module.exports = {
    CheckAdminUserTypeMiddleware: CheckAdminUserTypeMiddleware
};
