const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = require('../config/jwtSecret');

exports.adminRegister = async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne({ email: 'admin@chess2Kidz.com' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash('admin@123', 10);
        const admin = new Admin({
            name: 'Admin',
            email: 'admin@chess2Kidz.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            data: {
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};