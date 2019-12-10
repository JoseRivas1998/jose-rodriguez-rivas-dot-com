angular.module('tcg')
    .controller('AdminTechController', function ($rootScope, $scope, $location, GeneralAPI) {

        $rootScope.pageTitle = "Manage Technologies";

        $scope.technologies = [];

        $scope.addTechName = "";

        $scope.loadTechnologies = function () {
            $scope.technologies = [];
            $scope.addTechName = "";
            GeneralAPI.load_technologies().then(
                function (successCallback) {
                    $scope.technologies = successCallback.data;
                }
            );
        };

        $scope.updateTech = function (id, name) {
            if (name.length <= 0) {
                return;
            }
            GeneralAPI.update_tech({id: id, name: name}).then(
                function (successCallback) {
                    $scope.loadTechnologies();
                }
            );
        };

        $scope.deleteTech = function (id) {
            if(!confirm("Are you sure you want to remove that technology?")) {
                return;
            }
            GeneralAPI.delete_tech({id: id}).then(
                function (successCallback) {
                    $scope.loadTechnologies();
                }
            );
        };

        $scope.addTech = function () {
            if ($scope.addTechName.length <= 0) {
                return;
            }
            GeneralAPI.add_tech({name: $scope.addTechName}).then(
                function (successCallback) {
                    $scope.loadTechnologies();
                }
            );
        };

        $scope.loadTechnologies();

    });
