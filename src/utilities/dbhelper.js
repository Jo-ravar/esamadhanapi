var MongoClient = require('mongodb').MongoClient;
var config = require('../utilities/config');


var exportedObject = {};
MongoClient.connect(config.db, function (err, db) {
    if (!err) {
        console.log("Connected correctly to database server");
        exportedObject.db = db;
    }
});
module.exports = exportedObject;