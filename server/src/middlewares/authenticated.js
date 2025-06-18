jwt = require('jsonwebtoken');

const authenticated = (req, res,  next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        req.user = user;
        next();
    });
    
};

module.exports = authenticated;