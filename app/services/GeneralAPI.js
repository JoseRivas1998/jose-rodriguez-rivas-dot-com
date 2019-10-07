angular.module('tcg')
    .factory('GeneralAPI', function ($rootScope, $http) {
        return {
            load_technologies: function () {
                return $http({
                    url: $rootScope.base_url + "backend/loadTechnologies.php"
                });
            },

            load_portfolio: function () {
                return $http({
                    url: $rootScope.base_url + "backend/loadPortfolioEntries.php"
                })
            },

            authorize_user: function () {
                return $http({
                    url: $rootScope.base_url + "backend/authorizeUser.php"
                })
            },

            login: function(data) {
                return $http({
                    method: "POST",
                    data: $.param(data),
                    url: $rootScope.base_url + "backend/login.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

            list_min_portfolio: function () {
                return $http({
                    url: $rootScope.base_url + "backend/listPortfolioDTO.php"
                })
            },

        }
    });
