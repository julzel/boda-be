require('dotenv').config({ path: './.env.local' });
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const socket = require('./socket'); // Import the new socket module

socket.init(server); // Initialize Socket.IO

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
