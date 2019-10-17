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

            login: function (data) {
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

            get_entry: function (id) {
                return $http({
                    method: "POST",
                    data: $.param({id: id}),
                    url: $rootScope.base_url + "backend/loadEntry.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

            add_tech_to_entry: function (techId, entryId) {
                return $http({
                    method: "POST",
                    data: $.param({techId: techId, entryId: entryId}),
                    url: $rootScope.base_url + "backend/addTechToEntry.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

            remove_tech_from_entry: function (techId, entryId) {
                return $http({
                    method: "POST",
                    data: $.param({techId: techId, entryId: entryId}),
                    url: $rootScope.base_url + "backend/removeTechFromEntry.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

            update_entry: function (data) {
                return $http({
                    method: "POST",
                    data: $.param(data),
                    url: $rootScope.base_url + "backend/updateEntry.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

            add_entry: function (data) {
                return $http({
                    method: "POST",
                    data: $.param(data),
                    url: $rootScope.base_url + "backend/addEntry.php",
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            },

        }
    });
