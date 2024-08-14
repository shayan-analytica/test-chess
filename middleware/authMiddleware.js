const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = require('../config/jwtSecret');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
