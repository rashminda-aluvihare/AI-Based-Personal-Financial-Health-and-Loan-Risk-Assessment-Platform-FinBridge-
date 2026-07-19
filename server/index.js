const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const runMigrations = require('./config/migrate');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Registration
app.use('/api/auth', require('./routes/auth'));
app.use('/api/financial', require('./routes/financial'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'FinBridge Express Gateway API' });
});

// Port configuration for local & Railway environment
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Express Gateway Server running on port ${PORT}`);
  // Run schema migrations automatically
  await runMigrations();
  // Test connection on launch
  db.query('SELECT NOW()')
    .then((res) => console.log('Ping check database time:', res.rows[0].now))
    .catch((err) => console.error('Ping check database error:', err.message));
});
