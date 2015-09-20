var Parse = require('parse/node').Parse;
var config = require('../config/config');

var parseHandler = {};

Parse.initialize(config.parse.applicationId, config.parse.javascriptKey);
//
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
// });

parseHandler.test = function (req, res) {
    res.send('parse!');
}

module.exports = parseHandler;
