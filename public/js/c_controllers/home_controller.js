(function() {
	angular.module('homeCtrlModule', [])
		.controller('homeController', homeController)

	homeController.$inject = ['homeFactory']

	function homeController(homeFactory) {
		homeCtrl = this;
		homeCtrl.chooseSong     = false;
		homeCtrl.selectedSong   = null;
		homeCtrl.selectedMelody = null;

		homeCtrl.popMelodiesDD = function() {
			homeCtrl.selectedMelody = homeCtrl.selectedSong.melodies[0];
			console.log(homeCtrl.selectedMelody.melody)

		}

		homeCtrl.getAllSongs = function() {
			homeCtrl.chooseSong = true

			homeFactory.getAllSongs()
				.then(function(returnData) {
					homeCtrl.songs = returnData.data;
					homeCtrl.selectedSong = homeCtrl.songs[0];
					homeCtrl.popMelodiesDD();
					// need to extract songs and their respective melodies here
				})
		}
	}
})()