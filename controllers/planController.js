const Plan = require('../models/Plan');

exports.createPlan = async (req, res) => {
    try {
        const { name, price, status, features } = req.body;

        const existingPlan = await Plan.findOne({ name });
        if (existingPlan) {
            return res.status(400).json({ message: 'Plan with this name already exists' });
        }

        const newPlan = new Plan({
            name,
            price,
            status,
            features
        });

        const savedPlan = await newPlan.save();
        res.status(201).json({
            message: 'Plan created successfully',
            plan: savedPlan
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getPlanById = async (req, res) => {
    try {
        const { planId } = req.params;
        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const { name, price, status, features } = req.body;

        const updatedPlan = await Plan.findByIdAndUpdate(
            planId,
            { name, price, status, features },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.json({
            message: 'Plan updated successfully',
            plan: updatedPlan
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const { planId } = req.params;

        const deletedPlan = await Plan.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
