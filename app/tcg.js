var tcg = angular.module('tcg', ['ngRoute', 'ngSanitize']);

tcg.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
});

tcg.run(function ($rootScope, $location) {
    $rootScope.base_url = Generate_Base_Url($location);
});

function Generate_Base_Url($location) {
    var url = $location.protocol() + "://" + $location.host();
    if ($location.port() != 80) {
        url += ":" + $location.port();
    }
    url += "/";
    return url;
}