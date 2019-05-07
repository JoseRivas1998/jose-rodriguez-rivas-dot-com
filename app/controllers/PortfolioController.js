angular.module('tcg')
    .controller('PortfolioController', function ($rootScope, $scope, $location, GeneralAPI) {

        $scope.technologies = [];
        $scope.entries = [];
        $scope.loading = true;

        GeneralAPI.load_technologies().then(
            function (success) {
                $scope.technologies = success.data;
                GeneralAPI.load_portfolio().then(
                    function(success) { // fuck yo scope
                        $scope.entries = $rootScope.chunk(success.data, 2);
                        console.log($scope.entries);
                        $scope.loading = false;
                    }
                );
            }
        );
    });
