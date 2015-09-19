// ROUTER //
var router = require('express').Router();

// HANDLERS //
var viewHandler = require('../handlers/view-handler');
var personHandler = require('../handlers/person-handler');
var testHandler = require('../handlers/test-handler')

// ROUTES //
router.post('api/person/create', personHandler.create);
router.get('/test', testHandler.test)
router.get('/*', viewHandler.index);


module.exports = router;
