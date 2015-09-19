var instagramHandler = require('./instagram-handler');
var testHandler = {};

testHandler.test = function (req, res) {
    instagramHandler.trainClassifier = function(user_id) {
        instagramHandler.getFollowees(function (users) {
            for (i = 0; i < users.length; i++) {
                console.log(users[i]);
            }
        });

    }
};

module.exports = testHandler;
