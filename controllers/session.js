var userController = require('../controllers/user');
var memberController = require('../controllers/member');
var $socket = require('./socket');
var Constant = require('../common/constant');

var passport = require('passport');
var OPTS = {
  server: {
    url: 'ldap://192.168.1.190:389',
    searchBase: 'ou=Users,dc=tma,dc=com,dc=vn',
    searchFilter: '(uid={{username}})'
  }
};

var LdapStrategy = require('passport-ldapauth');
passport.use(new LdapStrategy(OPTS));

var sessionList = [];

/*!
 * 
 * Functions
 * 
 */
function getUsernameFromSession(ses) {
    for (i in sessionList) {
        var key = Object.keys(sessionList[i]);
        if (key == ses) {
            return sessionList[i][key].username;
        }
    }
    return null;
}

function getIdFromSession(ses) {
    for (i in sessionList) {
        var key = Object.keys(sessionList[i]);
        if (key == ses) return sessionList[i][key].id;
    }
    return null;
}

function getSessionFromId(id) {
    for (var i in sessionList) {
        var key = Object.keys(sessionList[i]);
        if(sessionList[i][key].id == id){
            return key;
        }
    }
    return null;
}

function removeSession(ses) {
    for (i in sessionList) {
        var key = Object.keys(sessionList[i])[0];
        if (key === ses) {
            var id = sessionList[i][key];
            delete sessionList[i];
            return;
        }
    }
}

function changeLoginStatus(session, status) {
    var id = getIdFromSession(session);
    if (id) {
        memberController.changeStatus(id, status , function (success) {
            memberDAO.get(id, function(member){
                $socket.sendMessage('memberUpdate', member);
            }, function(err){
                console.log(err);
            });
        });
    }
}

function checkLogin(req){
    if (getUsernameFromSession(req.cookies.SESSION)) {
       return true;
    }
    return false;
}

function sendResponse(res, api, code, data){
    if(!api) {
        res.redirect('/');
    } else {
        res.send(code, data);
    }
}


function doLdapAuthenticate(req, res, api){

    return passport.authenticate('ldapauth', {session: false}, function(err, resuser, info) {
        if (err || !resuser) {
            console.log("500 error", err);
            sendResponse(res, api, 401, {errorType: Constant.ErrorType.LOGIN_ERROR_AUTHENTICATION, error: 'authentication error'});
            return;
        }
        
        console.log("authentication succeeded: " + resuser.uid);
        userController.getUser(req.body.username, function (user) {
            console.log('GET USER OK', user);
            
            if (user == undefined || user.length == 0) {
                
                // insert user
                console.log('Insert user');
                userController.insert(resuser.uid, function(user) {
                    // insert member
                    console.log('Insert member');
                    var userData = {
                        username: resuser.uid,
                        name: resuser.displayName,
                        positionId: 4,
                        avatar: 'default.jpg',
                        dateOfBirth: 0
                    };
                    memberController.insert(userData, function(member){
                         console.log('Insert member OK', member);
                         
                         // insert room member
                         console.log('Insert room member for default');
                        
                         memberController.insertRoomMember({roomId: 5, memberId: member.id }, function(){}, function(){} );
                         memberController.insertRoomMember({roomId: 6, memberId: member.id }, function(){}, function(){} );
                         memberController.insertRoomMember({roomId: 7, memberId: member.id }, function(){}, function(){} );
                         memberController.insertRoomMember({roomId: 8, memberId: member.id }, function(){}, function(){} );
                         memberController.insertRoomMember({roomId: 22, memberId: member.id }, function(){}, function(){} );
                         memberController.insertRoomMember({roomId: 23, memberId: member.id }, function(){}, function(){} );

                         doLoginSuccessAction(member, res, api);

                    }, function(error){
                        console.log(err);
                        sendResponse(res, api, 500, {errorType: Constant.ErrorType.LOGIN_ERROR_SERVER_ERROR, error: 'add room member error'});
                    });
                    
                }, function(err) {
                    console.log(err);
                    sendResponse(res, api, 500, {errorType:  Constant.ErrorType.LOGIN_ERROR_SERVER_ERROR, error: 'add user error'});
                });

            } else {
                user = user[0].dataValues;
                memberController.getByUsername(user.username, function(member){
                    if(member){
                        doLoginSuccessAction(member, res, api);
                    } else {
                        sendResponse(res, api, 500, {errorType:  Constant.ErrorType.LOGIN_ERROR_SERVER_ERROR, error: 'member not found'});
                    }
                }, function(err){
                    sendResponse(res, api, 500, {errorType:  Constant.ErrorType.LOGIN_ERROR_SERVER_ERROR, error: 'member not found'});
                });
            }
        }, function(err){
            console.log('GET USER Error');
            console.log(err);
            sendResponse(res, api, 500, {errorType:  Constant.ErrorType.LOGIN_ERROR_SERVER_ERROR, error: 'get user error'});
        });
        return;
    }) (req, res);
}

function doLoginSuccessAction(member, res, api){
    var tempMember = member.dataValues;
    var session = "asdf21sd2sda123s" + new Date().getTime();
    res.cookie('SESSION', session, { maxAge: 3600000000, path: '/' });
    var newsession = {};
    var userData = {
        username: tempMember.username,
        id: tempMember.id
    };
    newsession[session] = userData;
    sessionList.push(newsession);
    changeLoginStatus(session, 1);

    console.log('doLoginSuccessAction OK');    
    sendResponse(res, api, 200, tempMember);
}

/*!
 * 
 * Exports
 * 
 */

exports.getUsernameFromSession = getUsernameFromSession;
exports.getIdFromSession = getIdFromSession;
exports.changeLoginStatus = changeLoginStatus;
exports.checkLogin = checkLogin;


/*!
 * 
 * APIs
 * 
 */
exports.loginWeb = function (req, res) {
    return doLdapAuthenticate(req, res, false);
};


exports.loginApi = function(req, res){
    req.body.username = req.query.username;
    req.body.password = req.query.password;
    return doLdapAuthenticate(req, res, true);
}

exports.logout = function (req, res) {
    changeLoginStatus(req.cookies.SESSION, 0);
    removeSession(req.cookies.SESSION);
    res.send(true);
}