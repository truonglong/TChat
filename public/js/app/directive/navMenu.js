define(['app'], function (app) {
    app.controller("navMenuController", function ($scope, $route, SiteName, $window, $location) {
        var tab_name = $route.current.navTab,
            ga_path = SiteName + $location.path();
        
        $scope.isTabActive = function (tabName) {
            if (tabName === tab_name) {
                return "active";
            }
        };
    });
    
    app.directive('navMenu', function () {
        return {
            restrict: 'A',
            controller: 'navMenuController',
            templateUrl: 'js/app/directive/template/navMenu.html'
        };
    });
});

