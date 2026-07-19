const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');
const auth = require('../middleware/auth');

// Income
router.post('/income', auth, financialController.addIncome);
router.get('/income', auth, financialController.getIncome);

// Expense
router.post('/expense', auth, financialController.addExpense);
router.get('/expense', auth, financialController.getExpense);

// Loan
router.post('/loan', auth, financialController.addLoan);
router.get('/loan', auth, financialController.getLoans);

// Goal
router.post('/goal', auth, financialController.addGoal);
router.get('/goal', auth, financialController.getGoals);

// AI Vetting
router.post('/predict', auth, financialController.calculateAIPrediction);

module.exports = router;
