var $socket = require('../socket/chatsocket'),
    session = require('../controllers/session'),
    userController = require('../controllers/user'),
    db = require('../db/db'),
    fs = require('fs'),
    myapp = require('../app');


// add a file
exports.create = function (req, res) {
    console.log(req.files);
    console.log(req.body);
    console.log('---------------');
    console.log(parseInt(req.files.thumbnail.size));

    /*if (req.body == undefined) return;

    console.log(req.files);

    if (parseInt(req.files.thumbnail.size) > 10240000) {
        fs.unlinkSync(req.files.thumbnail.path);
        res.status(400);
        res.send('');
        return;
    }


    fs.readFile(req.files.thumbnail.path, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            var fileName = req.files.thumbnail.name;
            var extension = fileName.substring(fileName.lastIndexOf('.'));
            
            var filePath = 'upload/' + req.body.roomId + new Date().getTime() + extension;
            fs.writeFile(myapp.__rootdirname + '/public/' + filePath, data, 'binary', function (err) {
                if (err) {
                    console.log(err);
                }
                fs.unlinkSync(req.files.thumbnail.path);

                db.findUser(req.body.userId, function (err, user) {
                    if (err || user == undefined || user.length == 0) {

                    } else {
                        user.rooms = [];
                        var msg = {
                            "creator": user,
                            "room": { _id: req.body.roomId },
                            "content": fileName,
                            "file": filePath,
                            "type": 'file'
                        };

                        var time = new Date().getTime();
                        msg.createTime = time;
                        db.insertMessage(msg, function (err, rs) {

                            if (!err) {
                                var wsMessage = {
                                    msgType: 'chat',
                                    data: rs[0]
                                };
                                $socket.sendMessage(wsMessage);
                            }
                        });
                    }
                });

                res.send('');
            });
        }
    });*/
};