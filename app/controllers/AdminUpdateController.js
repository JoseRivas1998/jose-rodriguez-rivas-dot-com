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
                function (success) {
                    $scope.technologies = success.data;
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.formData = {
            id: -1,
            name: "",
            year: 0,
            description: "",
            image_url: "",
            target_url: "",
            isOnGoing: false
        };

        $scope.loadEntry = function () {
            $scope.formData = {
                id: -1,
                name: "",
                year: 0,
                description: "",
                image_url: "",
                target_url: "",
                isOnGoing: false
            };
            GeneralAPI.get_entry($scope.selectedEntry.id).then(
                function (success) {
                    $scope.formData = {
                        id: success.data.id,
                        name: success.data.name,
                        year: success.data.year,
                        description: success.data.description,
                        image_url: success.data.image_url,
                        target_url: success.data.target_url,
                        isOnGoing: success.data.isOnGoing === 1
                    };
                    console.log($scope.formData);
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.loadEntries();
        $scope.loadTechnologies();

    });
