var Clarifai = require('./clarifai_node.js');
var stdio = require('stdio');
var config = require('../config/config');

var clarifaiHandler = {};

clarifaiHandler.test = function (req, res) {
    res.send('clarifai!');
}

module.exports = clarifaiHandler;
