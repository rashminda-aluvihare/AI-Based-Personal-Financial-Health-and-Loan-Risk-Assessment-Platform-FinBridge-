const db = require('../config/db');
const axios = require('axios');
require('dotenv').config();

// ML Microservice Base URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// ==========================================
// 1. INCOME CONTROLLERS
// ==========================================
exports.addIncome = async (req, res) => {
  const { source, amount, record_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO income_records (user_id, source, amount, record_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, source, amount, record_date || new Date()]
    );
    res.status(201).json({ success: true, income: result.rows[0] });
  } catch (err) {
    console.error('Add income error:', err);
    res.status(500).json({ success: false, message: 'Server error adding income record.' });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM income_records WHERE user_id = $1 ORDER BY record_date DESC', [req.user.id]);
    res.status(200).json({ success: true, records: result.rows });
  } catch (err) {
    console.error('Get income error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving income records.' });
  }
};

// ==========================================
// 2. EXPENSE CONTROLLERS
// ==========================================
exports.addExpense = async (req, res) => {
  const { category, amount, record_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO expense_records (user_id, category, amount, record_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, category, amount, record_date || new Date()]
    );
    res.status(201).json({ success: true, expense: result.rows[0] });
  } catch (err) {
    console.error('Add expense error:', err);
    res.status(500).json({ success: false, message: 'Server error adding expense record.' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM expense_records WHERE user_id = $1 ORDER BY record_date DESC', [req.user.id]);
    res.status(200).json({ success: true, records: result.rows });
  } catch (err) {
    console.error('Get expense error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving expense records.' });
  }
};

// ==========================================
// 3. LOAN CONTROLLERS
// ==========================================
exports.addLoan = async (req, res) => {
  const { loan_name, remaining_amount, monthly_emi, interest_rate, start_date, end_date } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO loan_records (user_id, loan_name, remaining_amount, monthly_emi, interest_rate, start_date, end_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.id, loan_name, remaining_amount, monthly_emi, interest_rate, start_date, end_date]
    );
    res.status(201).json({ success: true, loan: result.rows[0] });
  } catch (err) {
    console.error('Add loan error:', err);
    res.status(500).json({ success: false, message: 'Server error adding loan record.' });
  }
};

exports.getLoans = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM loan_records WHERE user_id = $1 ORDER BY start_date DESC', [req.user.id]);
    res.status(200).json({ success: true, records: result.rows });
  } catch (err) {
    console.error('Get loans error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving loan records.' });
  }
};

// ==========================================
// 4. GOAL CONTROLLERS
// ==========================================
exports.addGoal = async (req, res) => {
  const { name, target_amount, current_amount, target_date } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO goals (user_id, name, target_amount, current_amount, target_date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, name, target_amount, current_amount || 0.00, target_date]
    );
    res.status(201).json({ success: true, goal: result.rows[0] });
  } catch (err) {
    console.error('Add goal error:', err);
    res.status(500).json({ success: false, message: 'Server error creating saving goal.' });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM goals WHERE user_id = $1 ORDER BY target_date ASC', [req.user.id]);
    res.status(200).json({ success: true, records: result.rows });
  } catch (err) {
    console.error('Get goals error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving savings goals.' });
  }
};

// ==========================================
// 5. AI RISK PREDICTIONS
// ==========================================
exports.calculateAIPrediction = async (req, res) => {
  try {
    // 1. Gather all inputs from the database for this specific user
    const profile = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [req.user.id]);
    if (profile.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Please complete your user profile first.' });
    }

    const userProfile = profile.rows[0];

    // Get current total income
    const incomeSum = await db.query('SELECT SUM(amount) FROM income_records WHERE user_id = $1', [req.user.id]);
    const totalIncome = parseFloat(incomeSum.rows[0].sum) || parseFloat(userProfile.monthly_income) || 0;

    // Get current total expense
    const expenseSum = await db.query('SELECT SUM(amount) FROM expense_records WHERE user_id = $1', [req.user.id]);
    const totalExpenses = parseFloat(expenseSum.rows[0].sum) || 0;

    // Get current savings total
    const savingsResult = await db.query('SELECT cash_savings, bank_savings, investments, emergency_fund FROM financial_profiles WHERE user_id = $1', [req.user.id]);
    let totalSavings = 0;
    if (savingsResult.rows.length > 0) {
      const s = savingsResult.rows[0];
      totalSavings = parseFloat(s.cash_savings) + parseFloat(s.bank_savings) + parseFloat(s.investments) + parseFloat(s.emergency_fund);
    }

    // Get debt and EMI
    const loanResult = await db.query('SELECT SUM(remaining_amount) as total_debt, SUM(monthly_emi) as total_emi FROM loan_records WHERE user_id = $1', [req.user.id]);
    const totalDebt = parseFloat(loanResult.rows[0].total_debt) || 0;
    const totalEMI = parseFloat(loanResult.rows[0].total_emi) || 0;

    // 2. Prepare payload for Python FastAPI ML Server
    const mlPayload = {
      income: totalIncome,
      expenses: totalExpenses,
      savings: totalSavings,
      debts: totalDebt,
      emi: totalEMI,
      age: userProfile.age || 30,
      employment: userProfile.employment_type || 'salaried',
      dependents: userProfile.dependents || 0
    };

    // 3. Request predictions from Python Service
    let aiResponse;
    try {
      const predictionResponse = await axios.post(`${AI_SERVICE_URL}/predict`, mlPayload);
      aiResponse = predictionResponse.data;
    } catch (apiErr) {
      console.warn('FastAPI AI Service offline, falling back to simulated values.', apiErr.message);
      // Local fallback simulator if python container is not booted during QA
      const dti = (totalEMI / totalIncome) || 0;
      const score = Math.round(Math.max(30, 95 - (dti * 100) - (totalExpenses > totalIncome ? 15 : 0)));
      aiResponse = {
        score,
        riskLevel: score >= 75 ? 'Low' : score >= 50 ? 'Medium' : 'High',
        reasons: dti > 0.4 ? ['Debt-to-Income is extremely high.'] : ['Healthy debt profile.']
      };
    }

    // 4. Save results to financial_scores and risk_predictions in database
    await db.query(
      `INSERT INTO financial_scores (user_id, score, income_stability_score, savings_ratio_score, debt_ratio_score, expense_pattern_score, emergency_fund_score) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.user.id, 
        aiResponse.score, 
        userProfile.employment_type === 'salaried' ? 95 : 75,
        totalIncome > 0 ? Math.min(100, Math.round((totalSavings / totalIncome) * 100)) : 0,
        Math.min(100, Math.max(0, Math.round(100 - (totalEMI / (totalIncome || 1)) * 100))),
        Math.min(100, Math.max(0, Math.round(100 - (totalExpenses / (totalIncome || 1)) * 100))),
        totalSavings > 100000 ? 95 : 45
      ]
    );

    await db.query(
      'INSERT INTO risk_predictions (user_id, risk_score) VALUES ($1, $2)',
      [req.user.id, aiResponse.riskLevel]
    );

    // Save recommendations
    await db.query('DELETE FROM recommendations WHERE user_id = $1', [req.user.id]);
    for (const reason of aiResponse.reasons) {
      await db.query('INSERT INTO recommendations (user_id, tip, category) VALUES ($1, $2, $3)', [req.user.id, reason, 'AI Vetting']);
    }

    res.status(200).json({
      success: true,
      score: aiResponse.score,
      riskLevel: aiResponse.riskLevel,
      reasons: aiResponse.reasons
    });
  } catch (err) {
    console.error('Calculate AI predictions error:', err);
    res.status(500).json({ success: false, message: 'Server error processing AI risk algorithms.' });
  }
};
