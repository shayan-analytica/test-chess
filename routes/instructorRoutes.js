const express = require('express');
const { instructorRegister, instructorLogin } = require('../controllers/instructorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/instructor/register', authMiddleware, roleMiddleware('admin'), instructorRegister);
router.post('/instructor/login', instructorLogin);

export default router;