const express = require('express');
const { userRegister, userLogin } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

export default router;