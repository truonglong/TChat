require.config({

    baseUrl: "js/app",
    
	// alias libraries paths
    paths: {
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular/angular-route',
        'angularAMD': '../lib/angular/angularAMD',
        'angular-cookies': '../lib/angular/angular-cookies',
        'ngload': '../lib/angular/ngload',
        'ui-bootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-custom-tpls-1.3.2',
        'socketio': '/socket.io/socket.io',
        'jquery': '../lib/jquery/jquery-2.1.1.min',
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'ui-bootstrap': ['angular'],
        'angular-cookies': ['angular']
    },

    // kick start application
    deps: ['app']
});
