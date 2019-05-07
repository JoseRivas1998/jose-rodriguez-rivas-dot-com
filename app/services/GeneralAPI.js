angular.module('tcg')
    .factory('GeneralAPI', function($rootScope, $http){
        return {
            load_technologies: function() {
                return $http({
                    url: $rootScope.base_url + "backend/loadTechnologies.php"
                });
            }
        }
    });
