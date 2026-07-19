const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'finbridge_jwt_secret_token';

exports.register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    // Check if user exists
    const userExist = await db.query('SELECT * FROM users WHERE email = $1 OR phone = $2', [email, phone]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User with this email or phone already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await db.query(
      'INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, phone, hashedPassword, role || 'user']
    );

    const user = newUser.rows[0];

    // Create JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error during registration.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid email credentials.' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password credentials.' });
    }

    // Create JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error during login.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userResult = await db.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1', [req.user.id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const profileResult = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [req.user.id]);
    
    res.status(200).json({
      success: true,
      user: userResult.rows[0],
      profile: profileResult.rows[0] || null
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching profile details.' });
  }
};

exports.updateProfile = async (req, res) => {
  const { age, gender, occupation, employment_type, monthly_income, city, marital_status, dependents } = req.body;

  try {
    // Check if profile exists
    const profileExist = await db.query('SELECT * FROM user_profiles WHERE user_id = $1', [req.user.id]);

    let profile;
    if (profileExist.rows.length > 0) {
      // Update
      const updateResult = await db.query(
        `UPDATE user_profiles 
         SET age = $1, gender = $2, occupation = $3, employment_type = $4, monthly_income = $5, city = $6, marital_status = $7, dependents = $8 
         WHERE user_id = $9 RETURNING *`,
        [age, gender, occupation, employment_type, monthly_income, city, marital_status, dependents, req.user.id]
      );
      profile = updateResult.rows[0];
    } else {
      // Insert
      const insertResult = await db.query(
        `INSERT INTO user_profiles (user_id, age, gender, occupation, employment_type, monthly_income, city, marital_status, dependents) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [req.user.id, age, gender, occupation, employment_type, monthly_income, city, marital_status, dependents]
      );
      profile = insertResult.rows[0];
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      profile
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, message: 'Server error updating profile details.' });
  }
};
