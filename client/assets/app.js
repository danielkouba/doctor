var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function($httpProvider, $routeProvider){
	$httpProvider.interceptors.push(function($q, $location){
		return {
			'responseError' : function(rejection){
				if (rejection.status == 401){
					$location.url('/');
				}
				return $q.reject(rejection);
			}
		}
	});

	$routeProvider
	.when('/', {
		templateUrl: 'assets/partials/login.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/home', {
		templateUrl: 'assets/partials/home.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.when('/appointment', {
		templateUrl: 'assets/partials/appt.html',
		controller: 'userController',
		controllerAs: 'UC'
	})
	.otherwise({
		redirectTo: '/'
	})
})