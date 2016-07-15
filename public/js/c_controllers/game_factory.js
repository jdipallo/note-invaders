(function() {
	angular.module("gameFactoryModule", [])
		.factory('gameFactory', gameFactory)

	gameFactory.$inject = ['$http']

	function gameFactory($http) {
		var factoryObject = {}

		factoryObject.someFunction = function() {
			//return $http.get('/api/v0/some_route')
		}
		return factoryObject;
	}	
})()