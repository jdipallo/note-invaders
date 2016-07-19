(function() {
	angular.module('gameCtrlModule', [])
		.controller('gameController', gameController)
		

	gameController.$inject = ['noteInvadersP5', '$state','$stateParams']

	function gameController(noteInvadersP5, state, stateParams) {
		gameCtrl = this;
		gameCtrl.gameOver = false;
		gameCtrl.selectedSongName = homeCtrl.selectedSong.name;
		gameCtrl.selectedMelodyName = homeCtrl.selectedMelody.name;
		gameCtrl.selectedMelody = homeCtrl.selectedMelody.melody;

		gameCtrl.setTimerInterval = function(timerInterval) {
			gameCtrl.timerInterval = timerInterval;
		}
		gameCtrl.stopTimer = function() {
			clearInterval(gameCtrl.timerInterval);
		}
		gameCtrl.setMusic = function(music) {
			gameCtrl.music = music;
		}
		
		gameCtrl.stopMusic = function() {
			gameCtrl.music.stop();
		}
		gameCtrl.setGameOver = function(gameOver) {
			gameCtrl.gameOver = gameOver;
		}
		gameCtrl.getGameOver = function() {
			return gameCtrl.gameOver;
		}
		gameCtrl.clickedPiano = function() {
			console.log("You clicked the piano!!");
		}
		gameCtrl.setMelodyFn = function(playMelodyFn){
			gameCtrl.playMelodyFn = playMelodyFn;
		}
		gameCtrl.playMelody = function() {
			gameCtrl.playMelodyFn();
		}
		gameCtrl.replayGame = function() {
			state.reload();
		}
		gameCtrl.goHome = function() {
			state.go('home');
		}
	}
})()