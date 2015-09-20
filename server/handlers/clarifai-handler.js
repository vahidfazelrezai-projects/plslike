var config = require('../config/config');
var unirest = require('unirest');

clarifaiHandler = {};

clarifaiHandler.createCollection = function (callback) {
    var data = { "collection": {
            "id": config.clarifai.collectionId,
            "settings": {
                "max_num_docs": 100000
            }
        }
    }

    unirest.post(config.clarifai.baseUrl + 'curator/collections')
    .header('Authorization', 'Bearer ' + config.clarifai.accessToken)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(new Buffer(JSON.stringify(data)))
    .end(function (response) {
        // console.log(response.body);
        callback();
    });
}

clarifaiHandler.createDocument = function (url, concept, score) {
    var docid = new Date().getTime();
    var doc = {
        "document": {
            "docid": docid,
            "media_refs": [
                {
                    "url": url,
                    "media_type": "image"
                }
            ],
            "annotation_sets": [
                {
                    "namespace": "default",
                    "annotations": [
                        {
                            "score": score,
                            "tag": {
                                "cname": concept
                            }
                        }
                    ]
                }
            ],
            'options': {
                'want_doc_response': true,
                'recognition_options':
                    {
                        'model': 'general-v1.2'
                    }
            }
        }
    }
    return doc;
}

clarifaiHandler.addDocumentToCollection = function (obj) {
    unirest.post(config.clarifai.baseUrl + 'curator/collections/' + config.clarifai.collectionId + '/documents')
    .header('Authorization', 'Bearer ' + config.clarifai.accessToken)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(new Buffer(JSON.stringify(obj.document)))
    .end(function (response) {
        // console.log(response.body);
        obj.callback();
    });
}

clarifaiHandler.positive = function (url, concept, callback) {
    var doc = clarifaiHandler.createDocument(url, concept, 1);
    return clarifaiHandler.addDocumentToCollection(
        {
            'document': doc,
            'posNegString': 'positives',
            'callback': callback
        }
    );
}

clarifaiHandler.negative = function (url, concept, callback) {
    var doc = clarifaiHandler.createDocument(url, concept, -1);
    return clarifaiHandler.addDocumentToCollection(
        {
            'document': doc,
            'posNegString': 'negatives',
            'callback': callback
        }
    );
}

clarifaiHandler.train = function(concept, callback){
    var data = {
        'collection_ids': [config.clarifai.collectionId]
    }
    unirest.post(config.clarifai.baseUrl + 'curator/concepts/default/' + concept + '/train')
    .header('Authorization', 'Bearer ' + config.clarifai.accessToken)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(new Buffer(JSON.stringify(data)))
    .end(function (response) {
        console.log(response.body);
        callback();
    });
}

clarifaiHandler.predict = function(url, concept, callback){
    var data = {
        "urls": [url]
    }
    unirest.post(config.clarifai.baseUrl + 'curator/concepts/default/' + concept + '/predict')
    .header('Authorization', 'Bearer ' + config.clarifai.accessToken)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(new Buffer(JSON.stringify(data)))
    .end(function (response) {
        console.log(response.body);
        callback(response.body['urls'][0]['score']);
    });
}

clarifaiHandler.test = function (req, res) {
    // clarifaiHandler.createCollection(function () {
    //     clarifaiHandler.positive('http://vahid.io/assets/img/prof.jpg', 'meeee', function() {
    //         clarifaiHandler.positive('http://vahid.io/assets/img/prof.jpg', 'meeee', function() {
    //             clarifaiHandler.train('meeee', function() {
    //                 clarifaiHandler.predict('http://vahid.io/assets/img/prof.jpg', 'meeee', function () {
    //                     res.send('hello');
    //                 });
    //             });
    //         });
    //     });
    // });

    clarifaiHandler.train('meeee', function() {
        clarifaiHandler.predict('http://vahid.io/assets/img/cover.jpg', 'meeee', function (score) {
            res.send(score.toString());
        });
    });
}

module.exports = clarifaiHandler;
