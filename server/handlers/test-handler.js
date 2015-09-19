var testHandler = {};
var Parse = require('parse').Parse;
var Clarifai = require('./clarifai_node.js');
var ig = require('instagram-node').instagram();
Parse.initialize(JbKjS5vCcu4rzuQAEJlXafeBJuA3rhMXq82xiKyN, PnyvKOrEmngMeKRSKlKNiBxkw0lHeYySp0sgTckJ);


testHandler.test = function (req, res) {

    res.send('hello');

};

module.exports = testHandler;
