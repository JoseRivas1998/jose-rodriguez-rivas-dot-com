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

        $scope.techToAdd = -1;
        $scope.techToRemove = -1;

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

        $scope.entryTechs = [];
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
            $scope.entryTechs = [];
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
                    $scope.entryTechs = success.data.technologies;
                },
                function (error) {
                    console.log(error);
                }
            );
        };

        $scope.isTechnologyInEntry = function (techId) {
            var found = false;
            for (var i = 0; i < $scope.entryTechs.length && !found; i++) {
                if ($scope.entryTechs[i] === techId) {
                    found = true;
                }
            }
            return found;
        };

        $scope.selectTechToRemove = function (techId) {
            $scope.techToRemove = techId;
        };

        $scope.selectTechToAdd = function (techId) {
            $scope.techToAdd = techId;
        };

        $scope.addTech = function () {
            if ($scope.techToAdd !== -1) {
                GeneralAPI.add_tech_to_entry($scope.techToAdd, $scope.selectedEntry.id).then(
                    function (success) {
                        $scope.loadEntry();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
                $scope.techToAdd = -1;
            }
        };

        $scope.removeTech = function () {
            if ($scope.techToRemove !== -1) {
                GeneralAPI.remove_tech_from_entry($scope.techToRemove, $scope.selectedEntry.id).then(
                    function (success) {
                        $scope.loadEntry();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
                $scope.techToRemove = -1;
            }
        };

        $scope.submitForm = function () {
          GeneralAPI.update_entry($scope.formData).then(
              function(success) {
                  $scope.loadEntry();
              },
              function(error) {
                  console.log(error);
              }
          );
        };

        $scope.loadEntries();
        $scope.loadTechnologies();

    });
