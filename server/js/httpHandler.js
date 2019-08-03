const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};


module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    let allMoves = ['left', 'right', 'up', 'down'];
    let randomMove = allMoves[Math.floor(Math.random() * 4)];
    res.writeHead(200, headers);
    res.end(randomMove);
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
}