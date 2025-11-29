const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const SavingsGoal = require('../models/SavingsGoal');

// get all transactions
router.get('/transactions', async (req, res) => {
    try {
        const data = await Transaction.find().sort({ date: -1 });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({ message: "Error getting transactions" });
    }
});

// add a transaction
router.post('/transactions', async (req, res) => {
    // create new transaction
    const newTrans = new Transaction({
        desc: req.body.desc,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category
    });

    try {
        const saved = await newTrans.save();
        res.json(saved);
    } catch (error) {
        console.log(error);
        res.json({ message: "Error saving transaction" });
    }
});

// get savings goal
router.get('/savings', async (req, res) => {
    try {
        const goal = await SavingsGoal.findOne();
        if (goal) {
            res.json(goal);
        } else {
            res.json({ name: 'New Goal', target: 0 });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Error getting goal" });
    }
});

// update savings goal
router.post('/savings', async (req, res) => {
    try {
        // find existing goal
        let goal = await SavingsGoal.findOne();

        if (goal) {
            // update it
            goal.name = req.body.name;
            goal.target = req.body.target;
            await goal.save();
            res.json(goal);
        } else {
            // make new one
            const newGoal = new SavingsGoal({
                name: req.body.name,
                target: req.body.target
            });
            await newGoal.save();
            res.json(newGoal);
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Error saving goal" });
    }
});

module.exports = router;
