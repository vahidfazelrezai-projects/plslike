// ROUTER //
var router = require('express').Router();

// HANDLERS //
var viewHandler = require('../handlers/view-handler');
var instagramHandler = require('../handlers/instagram-handler');
var parseHandler = require('../handlers/parse-handler');
var clarifaiHandler = require('../handlers/clarifai-handler');

// ROUTES //

// test
router.get('/ct', clarifaiHandler.test);
router.get('/it', instagramHandler.test);

// instagram auth flow
router.get('/instagram/auth', instagramHandler.auth);
router.get('/instagram/callback', instagramHandler.callback);

// views
router.get('/', viewHandler.index);
router.get('/uploadImage', viewHandler.upload);
router.get('/addMedia', viewHandler.addMedia);

module.exports = router;
