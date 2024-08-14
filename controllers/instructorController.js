const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor');
const InstructorSchedule = require('../models/schedule');
const JWT_SECRET = require('../config/jwtSecret');

exports.instructorRegister = async (req, res) => {
    try {
        const { name, email, password, date, startTime, endTime, duration } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const existingUser = await Instructor.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Instructor already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newInstructor = new Instructor({
            name,
            email,
            role: 'instructor',
            password: hashedPassword
        });

        await newInstructor.save();

        res.status(201).json({ message: 'Instructor registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.instructorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const instructor = await Instructor.findOne({ email });
        if (!instructor) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const isMatch = await bcrypt.compare(password, instructor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: instructor._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            data: {
                name: instructor.name,
                email: instructor.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};