angular.module('tcg')
    .controller('AdminAddController', function ($rootScope, $scope, $location, GeneralAPI) {
        $rootScope.pageTitle = "Add Portfolio Entry";
        $scope.formData = {
            name: "",
            year: 0,
            description: "",
            image_url: "",
            target_url: "",
            isOnGoing: false,
            techs: []
        };

        $scope.technologies = [];

        $scope.techToAdd = -1;
        $scope.techToRemove = -1;

        $scope.loadTechnologies = function () {
            $scope.technologies = [];
            GeneralAPI.load_technologies().then(
                function (success) {
                    $scope.technologies = success.data;
                },
                function (error) {
                    console.log("ERROR", error);
                }
            );
        };

        $scope.reset = function () {
            $scope.formData = {
                name: "",
                year: 0,
                description: "",
                image_url: "",
                target_url: "",
                isOnGoing: false,
                techs: []
            };
            $scope.techToAdd = -1;
            $scope.techToRemove = -1;
            $scope.loadTechnologies();
        };

        $scope.selectTechToAdd = function (id) {
            $scope.techToAdd = id;
        };

        $scope.selectTechToRemove = function (id) {
            $scope.techToRemove = id;
        };

        $scope.isTechnologyInEntry = function (techId) {
            var found = false;
            for (var i = 0; i < $scope.formData.techs.length && !found; i++) {
                if ($scope.formData.techs[i] === techId) {
                    found = true;
                }
            }
            return found;
        };

        $scope.addTech = function () {
            if ($scope.techToAdd === -1) return;
            $scope.formData.techs.push($scope.techToAdd);
            $scope.techToAdd = -1;
        };

        $scope.removeTech = function () {
            if ($scope.techToRemove === -1) return;
            var found = false;
            var index = -1;
            for (var i = 0; i < $scope.formData.techs.length && !found; i++) {
                if ($scope.formData.techs[i] === $scope.techToRemove) {
                    found = true;
                    index = i;
                }
            }
            if (index === -1) return;
            $scope.formData.techs.splice(index, 1);
            $scope.techToRemove = -1;
        };

        $scope.submitForm = function () {
            console.log($scope.formData);
            GeneralAPI.add_entry($scope.formData).then(
                function (success) {
                    $scope.reset();
                },
                function (error) {
                    console.log("Error", error);
                }
            );
        };

        $scope.reset();

    });
