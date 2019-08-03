const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = require(('./messageQueue'));
module.exports.initialize = (queue) => {
  messageQueue = queue
};

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/') { //404 if not background image
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
      next();
    }
    else if (req.url === "/background.jpg") {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => { //look up after
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary'); //because binary data converting
        }
        res.end();
        next();
      });
    }
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
  if (req.method === 'POST' && req.url === "/background.jpg") {
    // var fileData = ;
    // req.on('data', (chunk) => {
    //   fileData += chunk;
    // })
    var fileData = Buffer.alloc(0);
    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    })
    /////
    req.on('end', () => { //need to because image broken, put chunks in parser in multipart utils
      var file = multipart.getFile(fileData)
      fs.writeFile(module.exports.backgroundImageFile, fileData, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();

      })
    })
  }
}

// module.exports.router = (req, res, next = () => { }) => {
//   console.log('Serving request type ' + req.method + ' for url ' + req.url);
//   if (req.method === 'GET') {
//     let allMoves = ['left', 'right', 'up', 'down'];
//     let randomMove = allMoves[Math.floor(Math.random() * 4)];
//     res.writeHead(200, headers);
//     res.end(randomMove);
//   }
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200, headers);
//     res.end();
//   }
// }