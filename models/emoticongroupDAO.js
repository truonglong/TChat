var db = require('./databaseModel');

exports.list = function (callback) {
    db.emoticongroup.findAll().then(function(emoticongroupList) {
        callback(emoticongroupList);
    });
};