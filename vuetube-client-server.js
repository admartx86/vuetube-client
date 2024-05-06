var express = require('express');
var app = express();
var path = require('path');
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));
// Serve the index.html file on all routes
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Start the server on port 3004
app.listen(3004, function () {
    console.log('Vue app listening on port 3004 (HTTP)');
});
