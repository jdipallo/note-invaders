(function() {
	angular.module("homeFactoryModule", [])
		.factory('homeFactory', homeFactory)

	homeFactory.$inject = ['$http']

	function homeFactory($http) {
		var factoryObject = {}

		factoryObject.login = function() {
			// return $http.get('/api/v0/login')
		}
		return factoryObject;
	}	
})()