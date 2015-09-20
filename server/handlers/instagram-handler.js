var ig = require('instagram-node').instagram();
var config = require('../config/config');

var instagramHandler = {};

// use client keys if no access token
ig.use({ client_id: config.ig.clientId, client_secret: config.ig.clientSecret });

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
instagramHandler.userInfo = function (user_id, callback) {
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

instagramHandler.test = function (req, res) {
    var user_id = 'self';
    var response = {};
    var pos_urls = [];
    var neg_urls = [];
    instagramHandler.getFollows(user_id, function (follows) {
        for (var i = 0; i < follows.length; i++) {
            response.follows = follows;
            instagramHandler.getMedias(follows[i], function (medias) {
                response.medias = medias;
                for (var j = 0; j < medias.length; j++) {
                    var likers = medias[j]['likes']['data'];
                    var url = medias[j]['images']['standard_resolution']['url'];
                    response.likers = likers;
                    response.url = url;
                    for (var k = 0; k < likers.length; k++) {
                        if (likers[k] == user_id) {
                            pos_urls.push(url);
                        } else {
                            neg_urls.push(url);
                        }
                    }
                }
            });
        }
        response.negative = neg_urls;
        response.positive = pos_urls;
        res.send(JSON.stringify(response));
    });
}

module.exports = instagramHandler;
