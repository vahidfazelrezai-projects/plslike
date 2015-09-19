var Parse = require('parse/node').Parse;
var config = require('../config/config');

var parseHandler = {};

Parse.initialize(config.parse.applicationId, config.parse.javascriptKey);

parseHandler.test = function (req, res) {
    res.send('parse!');
}

module.exports = parseHandler;
