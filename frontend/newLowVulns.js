// Another Vulnerable JavaScript file with Low and Medium Severity issues for SAST testing

const express = require('express');
const app = express();
const port = 6000;

app.use(express.json());

// 1. Hardcoded Sensitive Data (Medium Severity)
const apiKey = '12345-ABCDE-HARDCODED'; // Hardcoded sensitive API key

app.get('/apikey', (req, res) => {
  res.send(`Using API Key: ${apiKey}`);
});

// 2. Insufficient Input Validation (Medium Severity)
app.post('/validate', (req, res) => {
  const userInput = req.body.input; // No proper input validation
  res.send(`Received input: ${userInput}`);
});

// 3. Deprecated HTTP Method Usage (Low Severity)
app.get('/deprecated', (req, res) => {
  res.send('This endpoint uses a standard GET method but lacks proper implementation checks');
});

// 4. Static File Path Exposure in Logs (Low Severity)
const staticPath = '/static/files';
console.log(`Static files are served from: ${staticPath}`); // Logging path for static files

// 5. Default Server Response Headers (Low Severity)
app.get('/default-headers', (req, res) => {
  res.send('Default server response headers are being sent');
});

// 6. Comments with Sensitive Placeholder (Low Severity)
// Placeholder: API_SECRET_PLACEHOLDER -- to be replaced in production

app.listen(port, () => {
  console.log(`Vulnerability test app listening at http://localhost:${port}`);
});
