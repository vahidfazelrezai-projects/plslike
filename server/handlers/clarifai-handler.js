var config = require('../config/config');
var unirest = require('unirest');

clarifaiHandler = {};


clarifaiHandler.test = function (req, res) {
    unirest.post('http://www.google.com')
        .end(function (response) {
            res.send(response);
        });
}

module.exports = clarifaiHandler;
