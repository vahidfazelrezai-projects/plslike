var ig = require('instagram-node').instagram();
var config = require('../config/config');

var instagramHandler = {};

// use client keys if no access token
ig.use({ client_id: config.ig.clientId, client_secret: config.ig.clientSecret });

// redirect to instagram auth endpoint
instagramHandler.auth = function (req, res) {
    res.redirect(ig.get_authorization_url(config.ig.redirectUri, { scope: ['likes'], state: 'a state' }));
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
    var pos_urls = [];
    var neg_urls = [];
    instagramHandler.getFollows(user_id, function (follows) {
        for (var i = 0; i < follows.length; i++) {
            instagramHandler.getMedias(follows[i], function (medias) {
                if (medias) {
                    for (var j = 0; j < medias.length; j++) {
                        var likes = medias[j]['likes'];
                        var url = medias[j]['image'][]
                        for (var k = 0; k < likes.length; k++) {
                            if (likes[k] == user_id) {
                                pos_urls.push(me)
                            }
                        }
                        res.send(JSON.stringify(medias));
                    }
                } else {
                    res.send('no medias :(');
                }
            })
        }
        res.send({
            'negative': neg_urls,
            'positive': pos_urls
        });
    });
    // instagramHandler.getFollowers('self', function(followers) {
    //     for (i = 0; i < followers.length; i++) {
    //         follower = followers[i];
    //         console.log(follower);
    //         instagramHandler.getPictures(follower, function(media) {
    //             res.send(media);
    //         })
    //     }
    // });
}

module.exports = instagramHandler;
