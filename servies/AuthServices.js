const jwt = require('jsonwebtoken');


const Tokens = [];
const RefreshTokens = [];
module.exports.Generate_JWT_Token = (req, user) => {
    if (!req || !user) {
        throw new Error('Request and user must be provided to generate JWT token');
        return;
    }

    /**
     * Generate JWT Token
     * @param {Object} user - The user object containing user information.
     * @returns {string} - The generated JWT token.
     */
    const token = jwt.sign(
        {
            id: user._id,
            user_name: user.user_name,
            user_type: user.user_type,
        },
        process.env.JWT_SECRET_KEY, // Use the secret key from environment variables
        { expiresIn: '1h' }
    )
    Tokens.push(token); // Store the token in the Tokens array for tracking
    return { token };
}


module.exports.Generate_Refresh_JWT_Token = (req, user) => {
    if (!req || !user) {
        throw new Error('Request and user must be provided to generate JWT token');
        return;
    }
    const refreshToken = jwt.sign(
        {
            id: user._id,
            user_name: user.user_name,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    )
    RefreshTokens.push(refreshToken);
    return { refreshToken };
}

module.exports.Verify_JWT_Token = (token) => {
    if (!token) {
        return false;
    }
    try {
        const validate = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT token verification failed:', err);
                return false;
            }

            return decoded;
        });
        return validate;
    } catch (error) { // Handle any errors that occur during token verification or handle before server crash
        console.error('Error verifying JWT token:', error);
        return false;
    }
}


module.exports.Verify_Refresh_JWT_Token = (token) => {
    if (!token) {
        return false;
    }
    try {
        const validate = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT Refresh token verification failed:', err);
                return false;
            }
            console.log('JWT Refresh token is valid:', decoded);
            return true;
        });
        return validate;
    } catch (error) { // Handle any errors that occur during token verification or handle before server crash
        console.error('Error Refresh verifying JWT token:', error);
        return false;
    }
}

module.exports.Destroy_token = (req, res, token) => {
    if (!token) {
        console.error('No token provided to destroy');
        return false;
    }
    res.clearCookie('access_token');
    Tokens.splice(Tokens.indexOf(token), 1);
    console.log('Token destroyed successfully');
    return true;
}

/*
 Authentication Service using Session Management
 This service provides methods to set, get, and destroy user sessions.
 It uses express-session for session management.
*/
module.exports.SetUserSession = (req, user) => {
    if (!req || !user) {
        console.error('Request and user must be provided to set session');
        throw new Error('Request and user must be provided to set session');
        return;
    }

    // Store user information in session
    req.session.user = {
        id: user._id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_type: user.user_type,
    }

    return req.session.user;
}

module.exports.GetUserSession = (req) => {
    if (!req || !req.session || !req.session.user) {
        return false;
    }
    return req.session.user;
}

module.exports.DestroyUserSession = (req) => {
    if (!req || !req.session) {
        console.error('No session found to destroy');
        return false;
    }

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.log("Error While Destroying Session", err);
            return false;
        }

        console.log("Session Is Destroyed Successfully");
        return true;
    })
}