var mongoose = require('mongoose');
var dbPath = "mongodb://localhost/egg";
var options = {};
options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

var db = mongoose.connect(dbPath, options);

db.connection.on("error", function(error) {
    console.log("数据库连接失败：" + error);
});

db.connection.on("open", function() {
    console.log("------数据库连接成功！------");
});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});

module.exports = db;
