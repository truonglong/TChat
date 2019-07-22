var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    map = require('./routes/maproute'),
    routes = require('./routes'),
    socket = require('./controllers/socket'),
    busboy = require('connect-busboy');    

var fs = require('fs');
var multer = require('multer');

socket.start(server);

app.configure(function () {
    app.set('port', process.env.PORT || 3002);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(busboy());
    app.use(express.cookieParser('secret'));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function (req, res, next) {
        throw new Error(req.url + ' not found');
    });
    app.use(function (err, req, res, next) {
        console.log(err);
        res.send(err.message);
    });
    app.use(multer({ dest: './public/' }));
});

app.configure('development', function () {
    console.log('Development environment.');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    console.log('Production environment.');
    app.use(express.errorHandler());
});

app.post('/', routes.index);
app.get('/', routes.login);
map.mapRoute(app);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
server.timeout = 30000;
exports.__rootdirname = __dirname;