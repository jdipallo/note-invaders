(function() {
	angular.module('gameCtrlModule', [])
		.controller('gameController', gameController)
		

	gameController.$inject = ['noteInvadersP5', '$state','$stateParams']

	function gameController(gameFactory, state, stateParams) {
		gameCtrl = this;
	}
})()