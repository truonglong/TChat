define(['app'], function (app) {
    app.controller("SendFileController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, room) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }
        //convert size to MB, KB, byte
        function formatSizeUnits(bytes){
            if      (bytes>=1073741824)  {bytes=(bytes/1073741824).toFixed(2)+' GB';}
            else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
            else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
            else if (bytes>1)           {bytes=bytes+' bytes';}
            else if (bytes==1)          {bytes=bytes+' byte';}
            else                        {bytes='0 byte';}
            return bytes;
        }

            $scope.fileName = dataSend[0].name;
            $scope.sizeFile = formatSizeUnits(dataSend[0].size);
            $scope.warning = '';
            
			// show alert and disable button.
            $scope.isDisabled = false;
				var disableButton = function(){
					$scope.isDisabled = true;
				}

            if (dataSend[0].size >= 10000000) {
				$scope.warning = 'File size is too large';
				disableButton();
			}

			if (/\.(jpg|jpeg|png|gif|bmp)$/i.test($scope.fileName) ){
				var reader = new FileReader();

				reader.addEventListener("load", function () {
					$('#preview').attr('src', reader.result);
				}, false);
				reader.readAsDataURL(dataSend[0]);
			}
			else {
				var reader = new FileReader();

				reader.addEventListener("load", function () {
					$('#preview').attr('src', '../../../images/sendFile.png');
				}, false);
				reader.readAsDataURL(dataSend[0]);
				
			}

            $scope.sendFileDrop = function(){

		        var fd = new FormData();
	            fd.append('attachment', dataSend[0]);
	            fd.append('roomId', tchatInfo.currentRoom.id);
	            fd.append('memberId', tchatInfo.currentUser.id);
	            fd.append('body', '');
	            fd.append('emoticonId', '');
	            var reqUrl = 'message';
	            $http.post(reqUrl, fd, {
	                    transformRequest: angular.identity,
	                    headers: {
	                        'Content-Type': undefined
	                    }
	                });
                $uibModalInstance.close('close');
            }
        }]);
});