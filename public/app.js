// create our AngularJS application wrapping it in an IFFY to protect the 
// global namespace
// we are injecting the dependency of ui-router (for partials - SPA)
// inject the modules which really are just our controllers for note invaders
(function () {
	angular.module('NoteInvaders', ['ui.router',
							    	'homeCtrlModule', 
							    	'homeFactoryModule'])
			.config(routerConfig)

	routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']

	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: 		 '/',
				templateUrl: 'partials/home.html',
				controller:  'homeController as homeCtrl'
			})

		$urlRouterProvider.otherwise('/')
	}

})()