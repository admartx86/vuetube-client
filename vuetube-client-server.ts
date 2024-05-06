const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html file on all routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server on port 3004
app.listen(3004, () => {
    console.log('Vue app listening on port 3004 (HTTP)');
});