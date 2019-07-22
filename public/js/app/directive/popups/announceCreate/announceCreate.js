define(['app'], function (app) {
    app.controller("AnnounceCreateController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.notification = {
                content: ""
            }

            $scope.addNotification = function() {
                if($scope.notification.content == ''){
                    return;
                }
                var notificationData = {
                    content:$scope.notification.content,
                    user: tchatInfo.currentUser
                }

                $http.post('notification/add', notificationData, { timeout: 30000}).then(function(){
                    console.log('Add Notification OK');
                }, function(error){
                    console.log('Add Notification Error');
                });
                $uibModalInstance.close('close');
            }
        }
    ]);
});