require('dotenv').config();
const express = require('express');
const path = require('path');
const client = require('./db');

const app = express();
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Test route
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend is running 🚀' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('DB test failed ❌', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});
