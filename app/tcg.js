var tcg = angular.module('tcg', ['ngRoute', 'ngSanitize']);

tcg.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: "app/views/portfolio.html",
            controller: "PortfolioController"
        })
        .when('/admin', {
            templateUrl: "app/views/admin_login.html",
            controller: "AdminLoginController"
        })
        .when('/admin/update', {
            templateUrl: "app/views/admin_update.html",
            controller: "AdminUpdateController",
            authorize: ['admin']
        })
        .when('/admin/add', {
            templateUrl: "app/views/admin_add.html",
            authorize: ['admin']
        });

    $locationProvider.html5Mode(true);
});

tcg.run(function ($rootScope, $location) {
    $rootScope.base_url = Generate_Base_Url($location);

    $rootScope.$on('$routeChangeStart', function(event, to, from) {
        if(to.authorize && to.authorize.length > 0) {
            to.resolve = {
                authorize: function(GeneralAPI, $location) {
                    return GeneralAPI.authorize_user().then(
                        function(success) {
                            if(!success.data.isAuthorized) {
                                $location.path("/admin");
                            }
                        },
                        function(error) {
                            $location.path("/admin");
                        }
                    );
                }
            }
        }
    });

    $rootScope.chunk = function (arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

});

function Generate_Base_Url($location) {
    var url = $location.protocol() + "://" + $location.host();
    if ($location.port() != 80) {
        url += ":" + $location.port();
    }
    url += "/";
    return url;
}
