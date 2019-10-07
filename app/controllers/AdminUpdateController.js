angular.module('tcg')
    .controller('AdminUpdateController', function ($rootScope, $scope, $location, GeneralAPI) {

        $rootScope.pageTitle = "Update Portfolio Entry";

        $scope.portfolioEntries = [];

        $scope.selectedEntry = {id: -1, name: ""};

        $scope.formOut = "";
        $scope.loadEntries = function () {
            $scope.formOut = "";
            $scope.selectedEntry = {id: -1, name: ""};
            GeneralAPI.list_min_portfolio().then(
                function (success) {
                    $scope.portfolioEntries = success.data;
                    $scope.selectedEntry = $scope.portfolioEntries[0];
                    $scope.loadEntry();
                },
                function (error) {
                    $scope.formOut = error.data.message;
                }
            );
        };

        $scope.technologies = [];

        $scope.loadTechnologies = function () {
            GeneralAPI.load_technologies().then(
                function(success) {
                    $scope.technologies = success.data;
                },
                function(error) {
                    console.log(error);
                }
            );
        };

        $scope.loadEntry = function () {
            console.log($scope.selectedEntry);
        };

        $scope.loadEntries();
        $scope.loadTechnologies();

    });
