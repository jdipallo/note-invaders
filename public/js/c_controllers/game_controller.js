(function() {
	angular.module('gameCtrlModule', [])
		.controller('gameController', gameController)
		

	gameController.$inject = ['noteInvadersP5', '$state','$stateParams']

	function gameController(gameFactory, state, stateParams) {
		gameCtrl = this;
		gameCtrl.melody = stateParams;

		console.log("In gameController: stateParams:", gameCtrl.melody)	

		gameCtrl.getMelody = function() {
			return gameCtrl.melody;
		}	
	}
})()