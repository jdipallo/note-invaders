// create our AngularJS application wrapping it in an IFFY to protect the 
// global namespace
// we are injecting the dependency of ui-router (for partials - SPA)
// inject the modules which really are just our controllers for note invaders
(function () {
	angular.module('NoteInvaders', ['ui.router', 'homeCtrlModule', 'homeFactoryModule',
									'gameCtrlModule','gameFactoryModule'])
			.config(routerConfig)

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: 		 '/',
				templateUrl: 'partials/home.html',
				controller:  'homeController as homeCtrl'
			})
			.state('playgame', {
				url:  		 '/playgame',
				templateUrl: 'partials/play_game.html',
				controller:  'gameController as gameCtrl',
				onExit: 	  function () {
				    		    gameCtrl.stopTimer();
				    		    gameCtrl.stopMusic();
				  			  }
			})
			.state('rules', {
				url: 		'/rules',
				templateUrl: 'partials/rules.html'
			})

		$urlRouterProvider.otherwise('/')
	}
})()