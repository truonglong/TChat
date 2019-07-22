define(['app'], function (app) {
    app.controller("UserSettingController",  ['tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function (tchatInfo, $scope, $rootScope, modalService, $uibModalInstance) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.user = tchatInfo.currentUser;

            $scope.updateProfile = function(){

                if($scope.user.name == ''){
                    return;
                }

                $('#profileForm').submit();
                $uibModalInstance.close('close');
            }

            $scope.fileChanged = function(event) {
                if ( event.target.files &&  event.target.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#profAvatar').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(event.target.files[0]);
                    // event.target.value = event.target.defaultValue;
                }
            };
        }]);
});