const express = require('express');
const {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan
} = require('../controllers/planController');

const router = express.Router();

// Create a new plan
router.post('/plans', createPlan);

// Get all plans
router.get('/plans', getAllPlans);

// Get a single plan by ID
router.get('/plans/:planId', getPlanById);

// Update a plan by ID
router.put('/plans/:planId', updatePlan);

// Delete a plan by ID
router.delete('/plans/:planId', deletePlan);

export default router;
