(function() {
	angular.module("SongFactoryModule", [])
		.factory('songFactory', songFactory)

	songFactory.$inject = ['$http']

	function songFactory($http) {
		var factoryObject = {}

		factoryObject.allSongs = function() {
			return $http.get('/api/v0/songs')
		}

		return factoryObject;
	}	

})()