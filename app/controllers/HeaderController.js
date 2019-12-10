angular.module('tcg')
    .controller('HeaderController', function ($rootScope, $scope, $location) {
        $scope.mainMenu = [
            {
                src: "/",
                activeOn: "/",
                icon: 'briefcase',
                title: 'Portfolio'
            },
            {
                src: "/about",
                activeOn: "/about",
                icon: "info",
                title: "About"
            }
        ];

        $scope.checkActive = function (pathToCheck) {
            return $location.path() === pathToCheck;
        };

    });
