var ig = require('instagram-node').instagram();
var config = require('../config/config');

var instagramHandler = {};

ig.use({
  client_id: config.ig.clientId,
  client_secret: config.ig.clientSecret
});

var redirect_uri = 'http://plslike.me/instagram/callback';

instagramHandler.auth = function(req, res) {
  res.redirect(ig.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

instagramHandler.callback = function(req, res) {
  ig.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('Yay! Access token is ' + result.access_token);
    }
  });
};
//
//
// instagramHandler.loginUser = function(access, client, secret) {
//     ig.use({ access_token: access });
// }
//
// instagramHandler.isPublic = function() {
// }
//
// instagramHandler.getFollowers = function() {
//     return ig.user_followers('self', function(err, users, pagination, remaining, limit) {});
// }
//
// instagramHandler.getFollowees = function(user_id) {
//     return ig.user_follows(user_id, function(err, users, pagination, remaining, limit) {});
// }
//
// instagramHandler.getPictureIDs = function(user_id) {
//     return ig.user_media_recent(user_id, [100] function(err, medias, pagination, remaining, limit) {});
//
// }
//
// instagramHandler.getPicture = function(media_id) {
//     return ig.media(media_id, function(err, media, remaining, limit) {});
// }
//
// instagramHandler.checkLike = function(user_id, media_id) {
//     return user_id in ig.likes(media_id, function(err, result, remaining, limit) {});
// }
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
