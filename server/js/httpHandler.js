const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

const ajaxGetSwim = (file) => {
  $.ajax({
    type: 'GET',
    data: formData,
    url: 'http://127.0.0.1:8080/?',
    cache: false,
    contentType: false,
    processData: false,
    success: () => {
      // reload the page
      window.location = window.location.href;
    }
  });
};
let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
