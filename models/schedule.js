const mongoose = require('mongoose');

const instructorScheduleSchema = new mongoose.Schema({
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    startTime: { type: String, required: true }, // e.g., '09:00 AM'
    endTime: { type: String, required: true },   // e.g., '11:00 AM'
});

const InstructorSchedule = mongoose.model('InstructorSchedule', instructorScheduleSchema);

module.exports = InstructorSchedule;
