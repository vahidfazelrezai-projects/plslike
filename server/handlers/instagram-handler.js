var instagramHandler = {};

var ig = require('instagram-node').instagram();


instagramHandler.loginUser = function(access, client, secret) {
    ig.use({ access_token: access });
    ig.use({ client_id: client,
         client_secret: secret });
}

instagramHandler.isPublic = function() {
}

instagramHandler.getFollowers = function() {
    return ig.user_followers('self', function(err, users, pagination, remaining, limit) {});
}

instagramHandler.getFollowees = function(user_id) {
    return ig.user_follows(user_id, function(err, users, pagination, remaining, limit) {});
}

instagramHandler.getPictureIDs = function(user_id) {
    return ig.user_media_recent(user_id, [100] function(err, medias, pagination, remaining, limit) {});
 
}

instagramHandler.getPicture = function(media_id) {
    return ig.media(media_id, function(err, media, remaining, limit) {});
}

instagramHandler.checkLike = function(user_id, media_id) {
    return user_id in ig.likes(media_id, function(err, result, remaining, limit) {});
}
 
module.exports = instagramHandler;
