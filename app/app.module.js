(function(){
	'use strict';

	angular
		.module('app', ['app.dashboard', 'app.login', 'app.fbAuth'])
		.constant('FBURL', 'https://vivid-torch-762.firebaseio.com/');
})();