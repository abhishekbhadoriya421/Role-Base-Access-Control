const { GetUserSession } = require('../servies/AuthServices');
const { Verify_JWT_Token } = require('../servies/AuthServices');

// Check is user is logged in
const UserAuthCheck = (req, res, next) => {
    if (GetUserSession(req)) {
        // User is logged in, proceed to the next middleware or route handler
        return next();
    }
    // User is not logged in, redirect to login page
    return res.redirect('/auth/login');
}


const UserAuthCheckWithJWT = (req, res, next) => {
    if (!req.cookies || !req.cookies.access_token || !req.cookies.access_token.token) {
        return res.redirect('/auth/login');
    }
    const token = req.cookies.access_token.token || req.headers['authorization'];
    if (!token) {
        return res.redirect('/auth/login');
    }
    const isValid = Verify_JWT_Token(token);
    if (!isValid) {
        return res.redirect('/auth/login');
    }
    next();
}



module.exports = {
    UserAuthCheck: UserAuthCheck,
    UserAuthCheckWithJWT: UserAuthCheckWithJWT
};