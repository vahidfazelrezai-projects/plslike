var http = require('http');
var fs = require('fs');
var config = require('../config/config');

clarifaiHandler = {};


clarifaiHandler.test = function (req, res) {

    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
          protocol: 'http',
          host: 'google.com',
          path: '/',
          method: 'GET'
    };
    //
    // var callback = function(response) {
    //   var str = '';
    //
    //   //another chunk of data has been recieved, so append it to `str`
    //   response.on('data', function (chunk) {
    //     str += chunk;
    //   });
    //
    //   //the whole response has been recieved, so we just print it out here
    //   response.on('end', function () {
    //     res.send(str);
    //   });

    req = http.request(options).end();
    res.send('done');
}

module.exports = clarifaiHandler;
