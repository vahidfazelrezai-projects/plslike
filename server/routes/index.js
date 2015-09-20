// ROUTER //
var router = require('express').Router();

// HANDLERS //
var viewHandler = require('../handlers/view-handler');
var instagramHandler = require('../handlers/instagram-handler');
var parseHandler = require('../handlers/parse-handler');
var clarifaiHandler = require('../handlers/clarifai-handler');
var testHandler = require('../handlers/test-handler');

// ROUTES //

// test
router.get('/test', testHandler.test);
router.get('/clarifaitest', clarifaiHandler.test);
router.get('/instagramtest', instagramHandler.test);

// instagram auth flow
router.get('/instagram/auth', instagramHandler.auth);
router.get('/instagram/callback', instagramHandler.callback);

// views
router.get('/*', viewHandler.index);


module.exports = router;
