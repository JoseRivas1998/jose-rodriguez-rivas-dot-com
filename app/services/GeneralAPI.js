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
            }

        }
    });
