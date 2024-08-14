const express = require('express');
const { adminRegister, adminLogin } = require('../controllers/adminController');

const router = express.Router();

router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

export default router;