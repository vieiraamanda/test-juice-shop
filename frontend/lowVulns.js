// Additional Vulnerable JavaScript file with only Low Severity issues for SAST testing

const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// 1. Missing Cache Control Header (Low Severity)
app.get('/nocache', (req, res) => {
  // Response lacks cache control headers
  res.send('This response does not specify cache control headers');
});

// 2. Use of Debug Information in Response (Low Severity)
app.get('/debug', (req, res) => {
  const debugInfo = {
    version: '1.0.0',
    env: 'development',
  };
  res.json(debugInfo); // Exposing debug information
});

// 3. Verbose Error Messages (Low Severity)
app.get('/error', (req, res) => {
  try {
    throw new Error('Test error');
  } catch (err) {
    // Exposing detailed error information
    res.status(500).send(`Error occurred: ${err.message}`);
  }
});

// 4. Insecure Comments (Low Severity)
// TODO: Remove this comment before going to production
// This is a placeholder for a potential security review process

app.listen(port, () => {
  console.log(`Low vulnerability app listening at http://localhost:${port}`);
});
