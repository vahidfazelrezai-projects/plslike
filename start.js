// START SERVER //
var app = require('./plslike');


var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("running at localhost:" + port);
});
