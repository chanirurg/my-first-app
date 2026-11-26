
// Connect to the websocket
const socket = io();

// Get HTML elements
const msgInput = document.getElementById('msg');
const sendButton = document.getElementById('send');
const board = document.getElementById('board');

// Handle received messages
socket.on('receive message', function(msg) {

    const paragraph = document.createElement('p');

    paragraph.className = 'message';
    paragraph.textContent = msg;

    board.appendChild(paragraph);
});

// Handle send button click
sendButton.addEventListener('click', function() {

    // Extract message from input
    const message = msgInput.value.trim();

    if (message !== '') {

        // Emit message to server
        socket.emit('send message', message);

        // Display sent message on own board
        const paragraph = document.createElement('p');

        paragraph.className = 'message sent';
        paragraph.textContent = message;

        board.appendChild(paragraph);

        // Clear input
        msgInput.value = '';
    }

});
