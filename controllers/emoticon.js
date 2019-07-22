var emoticonDAO = require('../models/emoticonDAO'),
    memberDAO = require('../models/memberDAO'),
    emoticongroupDAO = require('../models/emoticongroupDAO'),
    session = require('../controllers/session'),
    socket = require('./socket'),
    fs = require('fs'),
    tchatApp = require('../app');
 
exports.list = function (req, res) {
    emoticonDAO.list(req.params.groupId, function(emoticonList){
        res.send(200, emoticonList);
    });
};

exports.groupList = function (req, res) {
    emoticongroupDAO.list(function(emoticongroupList){
        res.send(200, emoticongroupList);
    });
};