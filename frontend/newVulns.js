// Additional Vulnerable JavaScript file for testing SAST tools

const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// 1. Use of Hardcoded Cryptographic Key (Medium Severity)
const crypto = require('crypto');
const secretKey = 'hardcoded-secret-key'; // Hardcoded key for encryption

app.post('/encrypt', (req, res) => {
  const { data } = req.body;
  const cipher = crypto.createCipher('aes256', secretKey);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  res.send({ encrypted });
});

// 2. Missing Security Headers (Low Severity)
app.get('/headers', (req, res) => {
  // No security headers like Content-Security-Policy or X-Frame-Options
  res.send('Headers missing');
});

// 3. Insufficient Logging and Monitoring (Medium Severity)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    // Login success message without logging any critical events
    res.send('Login successful');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// 4. Directory Listing Enabled (Low Severity)
const path = require('path');
const serveIndex = require('serve-index');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', serveIndex(path.join(__dirname, 'public'))); // Enables directory listing

// Start the server
app.listen(port, () => {
  console.log(`Test app with low and medium vulnerabilities listening at http://localhost:${port}`);
});
