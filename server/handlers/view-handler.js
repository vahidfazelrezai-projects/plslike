var viewHandler = {}

var path = require('path');

// return index; all routing and logic handled client-side
viewHandler.index = function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/views/index.html'));
};

module.exports = viewHandler;
