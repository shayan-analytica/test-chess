const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InstructorSchedule = require('../models/schedule');
const JWT_SECRET = require('../config/jwtSecret');

exports.createSchedule = async (req, res) => {
    try {
        const { instructorId, date, startTime, endTime, duration } = req.body;

        const existingSchedule = await InstructorSchedule.findOne({
            instructorId,
            startTime,
            endTime
        });

        if (existingSchedule) {
            return res.status(400).json({ message: 'Schedule already exists for this time slot' });
        }

        const newSchedule = new InstructorSchedule({
            instructorId,
            startTime,
            endTime,
        });

        await newSchedule.save();
        res.status(201).json({
            message: 'Schedule created successfully',
            newSchedule
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getInstructorSchedules = async (req, res) => {
    try {
        const { instructorId } = req.params;
        const schedules = await InstructorSchedule.find({ instructorId });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const { date, startTime, endTime, duration } = req.body;

        const conflictingSchedule = await InstructorSchedule.findOne({
            _id: { $ne: scheduleId },
            date,
            startTime,
            endTime
        });

        if (conflictingSchedule) {
            return res.status(400).json({ message: 'Conflicting schedule already exists' });
        }

        const updatedSchedule = await InstructorSchedule.findByIdAndUpdate(
            scheduleId,
            { date, startTime, endTime, duration },
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.json({
            message: 'Schedule updated successfully',
            updatedSchedule
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const deletedSchedule = await InstructorSchedule.findByIdAndDelete(scheduleId);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};