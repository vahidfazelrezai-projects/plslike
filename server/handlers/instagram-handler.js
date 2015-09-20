var ig = require('instagram-node').instagram();
var config = require('../config/config');

var instagramHandler = {};

// use client keys if no access token
ig.use({ client_id: config.ig.clientId, client_secret: config.ig.clientSecret });

// redirect to instagram auth endpoint
instagramHandler.auth = function(req, res) {
    res.redirect(ig.get_authorization_url(config.ig.redirectUri, { scope: ['likes'], state: 'a state' }));
};

// handle instagram auth callback by using access token
instagramHandler.callback = function(req, res) {
    ig.authorize_user(req.query.code, config.ig.redirectUri, function(err, result) {
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
instagramHandler.userInfo = function(user_id, callback) {
    ig.user(user_id, function(err, result, remaining, limit) {
        callback(result);
    });
}

// run callback on list of users (followers) for user_id (or 'self')
instagramHandler.getFollowers = function(user_id, callback) {
    ig.user_followers(user_id, function(err, users, pagination, remaining, limit) {
        user_ids = users.map(function (x) {
            return x['id'];
        });
        callback(user_ids);
    });
}

// run callback on list of users (follows) for user_id (or 'self')
instagramHandler.getFollows = function(user_id, callback) {
    ig.user_follows(user_id, function(err, users, pagination, remaining, limit) {
        callback(users);
    });
}

instagramHandler.getPictures = function(user_id, callback) {
    ig.user_media_recent(user_id, function(err, medias, pagination, remaining, limit) {
        callback(medias);
    });
}

instagramHandler.test = function(req, res) {
    instagramHandler.getFollowers('self', function(followers) {
        res.send(followers);
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
//
// instagramHandler.getPeers = function(user_id) {
//     var followers = instagramHandler.getFollowers(user_id);
//     var peers = [];
//     for (i = 0; i < followers.length; i++) {
//         follower = followers[i];
//         followees = instagramHandler.getFollowees(follower);
//         for (j = 0; j < followees.length; j++) {
//             peers.push(followees[j]);
//         }
//     }
//     // remove duplicates from peers ??
// }

module.exports = instagramHandler;
