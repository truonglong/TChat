define(['app'], function (app) {
    app.controller("UserProfileController",  ['tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance', 'data',
        function (tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, user) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.user = user;

        }]);
});