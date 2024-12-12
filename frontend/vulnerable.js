// Vulnerable JavaScript file for testing SAST tools

// 1. XSS Vulnerability
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/xss', (req, res) => {
  // Reflecting user input directly into the response
  const userInput = req.query.input; // No sanitization here
  res.send(`<h1>User Input: ${userInput}</h1>`);
});

// 2. SQL Injection Vulnerability
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create a sample table
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, username TEXT, password TEXT)");
  db.run("INSERT INTO users (id, username, password) VALUES (1, 'admin', 'password123')");
});

app.post('/login', (req, res) => {
  const username = req.body.username; // No validation or escaping
  const password = req.body.password; // No validation or escaping

  // SQL query vulnerable to injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (rows.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// 3. Information Exposure through Comments (Low Severity)
// TODO: Remove this comment before production
// API_KEY=12345-this-is-a-fake-key

// 4. Insecure Direct Object Reference (IDOR - Medium Severity)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // No authorization check

  // Exposing user data without verifying the requester
  db.get(`SELECT * FROM users WHERE id = ${userId}`, (err, row) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Vulnerable app listening at http://localhost:${port}`);
});