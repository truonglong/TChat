var userDAO = require('../models/userDAO');
var Session = require('./session');
var memberController = require('../controllers/member');


/*!
 * 
 * Functions
 * 
 */
function getUser(username, success, error) {
    userDAO.getByUsername(username, success, error);
};

function insert(username, success, error) {
    var userData = {
        username: username
    };
    userDAO.insert(userData, function(user){
        if(success){
            success(userData);
        }
    }, function(err){
        if(error) {
            error(err);
        }
    });
};

/*!
 * 
 * Exports
 * 
 */
exports.getUser = getUser;
exports.insert = insert;


/*!
 * 
 * APIs
 * 
 */
