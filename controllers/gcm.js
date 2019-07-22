var gcmDao = require('../models/gcmDAO');
var Session = require('./session');
var request = require('request');

exports.register = function (req, res) {
    console.log("============== REGISTER GCM ===============");
    var idUser = Session.getIdFromSession(req.cookies.SESSION);
    if (idUser && req.params.id) {
        gcmDao.get(req.params.id,
            function (gcm) {
           
            if (gcm.length == 0) {
                var newRegistration = {
                    registrationId: req.params.id,
                    memberId: idUser
                };
                
                console.log('Insert gcm registration');
                gcmDao.insert(newRegistration, function () {
                    res.send(200, "Insert OK");
                }, function (e) {
                    console.log(e);
                    res.send(500, "Insert failed");
                });
            } else {
                console.log('GCM registration existed');
                console.log("registrationId: " + gcm[0].dataValues.registrationId);
                res.send(200, "OK, existed");
            }


        }, function () {
            res.send(500, "Failed to lookup gcm registration");
        });
    } else {
        res.send(401, "Not authorized");
    }
};

var notify = function (memberIdList) {
    
    gcmDao.list(memberIdList, function (gcmList) {
        
        if (!gcmList || gcmList.length == 0) {
            console.log('NOT FOUND ANY GCM REG INFO');
            return;
        }
        
        var toIds = [];
        
        console.log('============== GCM LIST ===================');        
        for (i in gcmList) {
            
            console.log(gcmList[i].dataValues.registrationId);
            toIds.push(gcmList[i].dataValues.registrationId);
        }
        console.log('=================================');
        
        request(
        {
            method: 'POST',
            uri: 'https://android.googleapis.com/gcm/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AIzaSyDic75SyRkfPZY_iSz7Xj-hLkIuES5Ydgw'
            },
            body: JSON.stringify({
                "registration_ids": toIds,
                "data": {
                    "msg": "message",
                    "fromu": "from room",
                    "name": "name"
                },
                "time_to_live": 108
            })
        }, function (error, response, body) {
            console.log("===================== ERROR: " + error);
            console.log("===================== response: " + response);
            console.log("===================== body: " + body);
        });
    });
}
exports.notify = notify;