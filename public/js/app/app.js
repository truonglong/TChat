define(['angularAMD', 'angular-route', 'socketio', 'jquery', 'ui-bootstrap', 'angular-cookies'], function (angularAMD, angularRoute, io, jquery) {
    var tchat = angular.module("tchat", ['ngRoute', 'ui.bootstrap', 'ngCookies']);

    tchat.config(function ($routeProvider) {
        $routeProvider
            .when("/home", angularAMD.route({
                templateUrl: 'views/home.html', controllerUrl: 'controller/home_ctrl', navTab: "home"
            }))
            .when("/pictures", angularAMD.route({
                templateUrl: 'views/pictures.html', controllerUrl: 'controller/pictures_ctrl', navTab: "pictures"
            }))
            .otherwise({redirectTo: '/home'})
        ;
    });

    tchat.service('modalService', ['$uibModal',
        function ($modal) {
            this.showModal = function (template, controller, data, options) {

                var defaultOpts = {
                    templateUrl: template,
                    controller: controller,
                    animation: true,
                    resolve: {
                        data: function () {
                            return data;
                        }
                    }
                }

                if(options){
                    for(var i in options){
                        defaultOpts[i] = options[i];
                    }
                }

                return $modal.open(defaultOpts);
            };
        }]);


    tchat.factory('socket', ['$rootScope', function($rootScope) {
        var socket = io('/chat').connect();
        
        socket.on('error', function() {
            console.log('======= WS ERROR ===========');
        });
        socket.on('close', function() {
            console.log('======= WS close ===========');
        });
        socket.on('reconnecting', function() {
            console.log('======= WS reconnecting ===========');
            $rootScope.$emit('reconnecting');
        });
        socket.on('connect_failed', function() {
            location.reload();
        });

        var readCookie = function(name){
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        };

        socket.on('getSomeData', function () {
            var session = readCookie('SESSION');
            console.log(session);
            socket.emit('initRoom', session);
        });

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () { 
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }]);

    tchat.factory('utils', ['$q', '$rootScope', function($q, $rootScope) {
        var utils = {};
        
        utils.focused = true;
        
        window.onfocus = function () {
            utils.focused = true;
        };
        window.onblur = function () {
            utils.focused = false;
        };
        
        utils.compareDate = function(time1, time2){
            if(time1 == time2){
                return 0;
            }
            var tempDate1 = new Date(time1);
            var tempDate2 = new Date(time2);
            if(tempDate1.getFullYear() < tempDate2.getFullYear()){
                return -1;
            } else if(tempDate1.getFullYear() > tempDate2.getFullYear()){
                return 1;
            } else {
                if(tempDate1.getMonth() < tempDate2.getMonth()){
                    return -1;
                } else if(tempDate1.getMonth() > tempDate2.getMonth()){
                    return 1;
                } else {
                    if(tempDate1.getDate() < tempDate2.getDate()){
                        return -1;
                    } else if(tempDate1.getDate() > tempDate2.getDate()){
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        };
        
        utils.convertShortTime = function(time){
            var tempTime = new Date(time);
            var tempHour = tempTime.getHours();
            if(tempHour < 10){
                tempHour = '0' + tempHour;
            }
            var tempMinute = tempTime.getMinutes();
            if(tempMinute < 10){
                tempMinute = '0' + tempMinute;
            }
            return tempHour + ':' + tempMinute;
        };

        utils.convertToDayTime = function(time){
            var tempTime = new Date(time);
            var tempHour = tempTime.getHours();
            if(tempHour < 10){
                tempHour = '0' + tempHour;
            }
            var tempMinute = tempTime.getMinutes();
            if(tempMinute < 10){
                tempMinute = '0' + tempMinute;
            }

            var tempYear = tempTime.getFullYear();
            var tempMonth = tempTime.getMonth() + 1;
            if(tempMonth < 10){
                tempMonth = '0' + tempMonth;
            }
            var tempDate = tempTime.getDate();
            if(tempDate < 10){
                tempDate = '0' + tempDate;
            }

            return  tempDate + '/' + tempMonth + '/' + tempYear + ' ' + tempHour + ':' + tempMinute;
        };
        
        utils.convertLongTime = function(time){
            var tempTime = new Date(time);
            var tempYear = tempTime.getFullYear();
            var tempMonth = tempTime.getMonth() + 1;
            if(tempMonth < 10){
                tempMonth = '0' + tempMonth;
            }
            var tempDate = tempTime.getDate();
            if(tempDate < 10){
                tempDate = '0' + tempDate;
            }
            return tempDate + '-' + tempMonth + '-' + tempYear;
        };
        
        utils.escapeHTML = function (content){
            var el = document.createElement("div");
            el.innerText = el.textContent = content;
            return el.innerHTML;
        }
        
        utils.notify = function(data, desktopNotify = true){
            if ("Notification" in window && Notification.permission == 'granted' && desktopNotify) {
                var notification = new Notification(data.roomName, { icon: data.icon, body: data.body, dir: "rtl" });

                notification.onclick = function () {
                    window.parent.focus();
                }
                setTimeout(function () {
                    notification.close();
                }, 3000);
            }

            $.titleAlert(data.roomName + ': ' + data.body, {
                requireBlur: true,
                stopOnFocus: true,
                interval: 1000
            });
        }
        
        return utils;
    }]);

    tchat.factory('tchatInfo', ['$q', '$rootScope', function($q, $rootScope) {
        var tchatInfo = {};
        tchatInfo.pendingEmoticon = 0;
        tchatInfo.pendingMessageBody = '';
        tchatInfo.roomList = [];
        tchatInfo.memberList = [];
        tchatInfo.currentRoom = {
                name: '',
                id: 0,
        };
        tchatInfo.notification = {
            content:'',
            memberId: 0
        };
        $rootScope.searchMsg = '';

        
        $rootScope.$on('member:update' , function(event, data){ 
            tchatInfo.currentUser = data;
        });

        $rootScope.$on('notification:update' , function(event, data){ 
            tchatInfo.notification = data;
        });

        return tchatInfo;
    }]);

    tchat.filter('thumbs', function(){
        return function(input){
            return input.replace('upload', 'upload');
        };
    });

    
    // Define constant to be used by Google Analytics
    tchat.constant("SiteName", "/tchat");
    return angularAMD.bootstrap(tchat);

});
