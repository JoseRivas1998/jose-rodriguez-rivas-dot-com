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
            },
            {
                src: "/resume",
                activeOn: "/resume",
                icon: "file-text-o",
                title: "Resume"
            }
        ];

        console.log($scope.mainMenu);

        $scope.checkActive = function (pathToCheck) {
            return $location.path() === pathToCheck;
        };

    });
