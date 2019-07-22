define(['app'], function (app) {
    app.controller("ImagePreviewController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance', 'data',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, message) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.message = message;

            $scope.closeReviewDialog = function(){
                $uibModalInstance.close('close');
            }

            $scope.imagePreviewReady = function() {
                    console.log('on show modal');

                    var mWidth = $(window).width();
                    
                    var mHeight = $(window).height();
                    var dialogHeight = Math.round(mHeight * 80 / 100);
                    var dialogWidth = Math.round(mWidth * 80 / 100);

                    $('.modal-dialog').css({
                        "max-height": dialogHeight + 'px',
                        "max-width": dialogWidth + 'px',
                        'overflow': 'hidden',
                        'width': 'auto',
                        'height': 'auto'
                    });

                    $('.review-body').css({
                        "max-height": (dialogHeight - 170) + 'px',
                        "max-width": (dialogWidth) + 'px'
                    });
                    
                    $('.review-body img').css({
                        "max-height": (dialogHeight - 200) + 'px',
                        "max-width": (dialogWidth) + 'px'
                    });
                    

                    $('.modal-dialog').css({ opacity: 0 });
                    setTimeout(function(){
                        var img = document.getElementById('review-image');
                        $('.modal-dialog').css({
                             opacity: 1,
                            'width': (img.clientWidth + 42) + 'px',
                            //"margin-top": '-' + ($('.modal-dialog').height() / 2) + 'px',
                            //"margin-left": '-' + ((img.clientWidth + 32) / 2 )+ 'px'
                        });
                    }, 100);
            }

           
            
        }]);
});