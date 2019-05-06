angular.module('tcg')
    .controller('HeaderController', function ($rootScope, $scope, $location) {
        $scope.mainMenu = [
            {
                src: "/",
                active: "/",
                icon: '',
                name: 'Portfolio'
            }
        ];

        console.log($scope.mainMenu);

    });
