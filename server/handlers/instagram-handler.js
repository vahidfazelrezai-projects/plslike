var ig = require('instagram-node').instagram();
var config = require('../config/config');
var clarifaiHandler = require('./clarifai-handler');

var instagramHandler = {};

// use client keys if no access token
ig.use({ client_id: config.ig.clientId, client_secret: config.ig.clientSecret });
ig.use({ access_token: '1089257137.8ed82bc.87b05ba13c95416a9e460391cd39079c' });

// redirect to instagram auth endpoint
instagramHandler.auth = function (req, res) {
    res.redirect(ig.get_authorization_url(config.ig.redirectUri, { scope: ['basic'], state: 'a state' }));
};

// handle instagram auth callback by using access token
instagramHandler.callback = function (req, res) {
    ig.authorize_user(req.query.code, config.ig.redirectUri, function (err, result) {
    if (err) {
        console.log(err.body);
        res.send("Didn't work");
    } else {
        ig.use({ access_token: result.access_token });

        console.log('Yay! Access token is ' + result.access_token);
        res.send('Yay! Access token is ' + result.access_token);
    }
  });
};

// run callback on info for user_id (or 'self')
instagramHandler.getUserInfo = function (user_id, callback) {
    ig.user(user_id, function (err, result, remaining, limit) {
        callback(result);
    });
}

// run callback on list of users (followers) for user_id (or 'self')
instagramHandler.getFollowers = function (user_id, callback) {
    ig.user_followers(user_id, function (err, users, pagination, remaining, limit) {
        if (users) {
            user_ids = [];
            for (var i = 0; i < users.length; i++) {
                user_ids.push(users[i]['id']);
            }
            callback(user_ids);
        } else {
            callback([]);
        }
    });
}

// run callback on list of users (follows) for user_id (or 'self')
instagramHandler.getFollows = function (user_id, callback) {
    ig.user_follows(user_id, function (err, users, pagination, remaining, limit) {
        if (users) {
            user_ids = [];
            for (var i = 0; i < users.length; i++) {
                user_ids.push(users[i]['id']);
            }
            callback(user_ids);
        } else {
            callback([]);
        }
    });
}

instagramHandler.getMedias = function (user_id, callback) {
    ig.user_media_recent(user_id, function (err, medias, pagination, remaining, limit) {
        if (medias) {
            callback(medias);
        } else {
            callback([]);
        }
    });
}

instagramHandler.trainUser = function (user_id) {
    instagramHandler.getUserInfo(user_id, function (result) {
        var self_id = result['id'];
        instagramHandler.getFollows(user_id, function (follows) {
            for (var i = 0; i < follows.length; i++) {
                instagramHandler.getMedias(follows[i], function (medias) {
                    for (var j = 0; j < medias.length; j++) {
                        var likers = medias[j]['likes']['data'];
                        var url = medias[j]['images']['standard_resolution']['url'];
                        for (var k = 0; k < likers.length; k++) {
                            if (likers[k]['id'] == self_id) {
                                clarifaiHandler.positive(url, self_id, function() {});
                                console.log('positive (' + self_id + '): ' +  url);
                            } else {
                                clarifaiHandler.negative(url, self_id, function() {});
                                console.log('negative (' + self_id + '): ' +  url);
                            }
                        }
                    }
                });
            }
        });
    });
}

instagramHandler.trainFollowers = function (user_id) {
    instagramHandler.getFollowers('self', function (followers) {
        for (var i = 0; i < followers.length; i++) {
            instagramHandler.trainUser(followers[i]);
        }
    });
}

instagramHandler.test = function (req, res) {
    // instagramHandler.trainFollowers('self');
    clarifaiHandler.train('40423171', function() {
        clarifaiHandler.predict('http://vahid.io/assets/img/cover.jpg', '40423171', function (score) {
            res.send(score.toString());
        });
    });
}

module.exports = instagramHandler;
