var userDAO = require('../models/userDAO');
var Session = require('./session');


var exec = require('child_process').exec;

exports.searchEmployee = function (req, res) {
    // var puts = function(error, stdout, stderr){
    //     console.log(error);
    //     sys.puts(stdout);
    //     sys.puts(stderr);
    //     //
    //     console.log('_________________rs_________________', stdout);
    //     res.send(200, stdout);
    // }
    exec('ls', function(error, stdout, stderr){
        console.log(error);
    });
};
