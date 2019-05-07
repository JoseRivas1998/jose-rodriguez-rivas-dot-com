angular.module('tcg')
    .controller('PortfolioController', function ($rootScope, $scope, $location, GeneralAPI) {

        GeneralAPI.load_technologies().then(
            function (success) {
                console.log(success);
            }
        );
    });
