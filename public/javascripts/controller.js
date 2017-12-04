angular.module('cs411', ['ngRoute', 'ngCookies'])
	.directive('nameDIsplay', function () {
		return {
			scope: true,
			restrict: 'EA',
			template: "<b>This can be anything {{name}}</b>"
		}
	})
	.controller('cuisineSearch', function ($scope, $http, $cookies) {

		$scope.twitterAuth = function () {
			var openUrl = '/auth/twitter/'
			$scope.authorized = true
			window.location.replace(openUrl)

		}
	})
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/:status', {
					templateUrl: '',
					controller: 'authController'
				})
				.when(':status', {
					templateUrl: '',
					controller: 'authController'
				})
				.otherwise({
					redirectTo: '/'
				})
		}])

	.controller('authController', function ($scope) {
        let authStatus =  $location.search();
        console.log(authStatus)
        console.log('In authController')
        $scope.authorized = !!authStatus
    })