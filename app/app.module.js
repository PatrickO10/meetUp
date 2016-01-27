(function() {
	'use strict';

	angular
		.module('app', ['app.dashboard', 'app.login', 'app.fbAuth', 'app.event', 'app.register', 'ngMessages'])
		.constant('FBURL', 'https://vivid-torch-762.firebaseio.com/');
})();
