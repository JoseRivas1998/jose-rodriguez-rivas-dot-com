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

        $scope.reset = function() {
            $scope.formData = {
                name: "",
                year: 0,
                description: "",
                image_url: "",
                target_url: "",
                isOnGoing: false,
                techs: []
            };
        };

        $scope.reset();

    });
