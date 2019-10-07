angular.module('tcg')
    .controller('AdminLoginController', function ($rootScope, $scope, $location, GeneralAPI) {

        $rootScope.pageTitle = "Login";

        $scope.formData = {
            username: "",
            password: ""
        };

        $scope.formErrors = {
            username: "",
            password: ""
        };

        $scope.formOut = "";

        $scope.validateForm = function () {
            $scope.formErrors = {
                username: "",
                password: ""
            };
            $scope.formData.username = $scope.formData.username.trim().toLowerCase();
            $scope.formData.password = $scope.formData.password.trim();
            var isValid = true;
            if($scope.formData.username.length === 0) {
                $scope.formErrors.username = "Required Field";
                isValid = false;
            }
            if($scope.formData.password.length === 0) {
                $scope.formErrors.password = "Required Field";
                isValid = false;
            }
            return isValid;
        };

        $scope.submitForm = function() {
            $scope.formOut = "";
            if($scope.validateForm()) {
                $scope.formOut = "Logging In...";
                GeneralAPI.login($scope.formData).then(
                    function(success) {
                        $scope.formOut = "Logged in!";
                    },
                    function(error) {
                        $scope.formOut = error.data.message;
                    }
                );
            }
        };

    });
