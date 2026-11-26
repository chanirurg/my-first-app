
// Import required modules
const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

// Initialize Express
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Serve static resources
app.use(express.static(path.join(__dirname)));

// Handle client connections
io.on('connection', function(socket) {

    console.log('A client connected');

    // Listen for messages from clients
    socket.on('send message', function(msg) {

        console.log('Message received:', msg);

        // Send message to all other connected clients
        socket.broadcast.emit('receive message', msg);

    });

});

if (require.main === module) {
    const PORT = 9000;
    server.listen(PORT, function() {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
