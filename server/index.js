
const queue = require('./js/messageQueue');
const keypressHandler = require('./js/keypressHandler');
const httpHandler = require('./js/httpHandler');
const http = require('http');

keypressHandler.initialize(queue.enqueue);
httpHandler.initialize(queue)

const server = http.createServer(httpHandler.router);

const port = 4000;
const ip = '127.0.0.1';
server.listen(port, ip); //listening at this port cd 

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
