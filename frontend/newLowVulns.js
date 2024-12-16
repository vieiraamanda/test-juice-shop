// Another Vulnerable JavaScript file with only Low Severity issues for SAST testing

const express = require('express');
const app = express();
const port = 6000;

app.use(express.json());

// 1. Deprecated HTTP Method Usage (Low Severity)
app.get('/deprecated', (req, res) => {
  res.send('This endpoint uses a standard GET method but lacks proper implementation checks');
});

// 2. Static File Path Exposure in Logs (Low Severity)
const staticPath = '/static/files';
console.log(`Static files are served from: ${staticPath}`); // Logging path for static files

// 3. Default Server Response Headers (Low Severity)
app.get('/default-headers', (req, res) => {
  res.send('Default server response headers are being sent');
});

// 4. Comments with Sensitive Placeholder (Low Severity)
// Placeholder: API_SECRET_PLACEHOLDER -- to be replaced in production

app.listen(port, () => {
  console.log(`Low vulnerability test app listening at http://localhost:${port}`);
});
