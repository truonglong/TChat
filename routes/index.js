var Session = require('../controllers/session');
/*
 * GET home page.
 */


exports.index = function (req, res) {
    return Session.loginWeb(req, res);
    
};

exports.login = function (req, res) {
    if (Session.checkLogin(req)) {
        res.sendfile('index.html');
    } else {
        res.sendfile('login.html');
    }
};