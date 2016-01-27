(function() {
	'use strict';

	angular
		.module('app.dashboard')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['authService', '$firebaseArray'];

	function MainCtrl(authService, $firebaseArray) {
		var self = this;

		self.logOut = function() {
			authService.logOutUser();
			self.loggedStatus = false;
		};

		authService.setOnAuth(authDataCallback);

		// Callback to set user's events.
		function authDataCallback(authData) {
			if (authData) {
				console.log("User " + authData.uid + " is logged in with " + authData.provider);
				var userRef = authService.setEventRef(authData.uid);
				self.eventsArray = $firebaseArray(userRef);
				self.loggedStatus = true;
			} else {
				console.log("User is logged out");
			}
		}

		// Since autofocus doesn't work with bootstrap modals, I am using this code from Bootstrap JS to replace it
		// for autofocus.
		$('.signUp, .newEvent, .login').on('shown.bs.modal', function() {
			$('#fname').focus();
			$('#eName').focus();
			$('#logEmail').focus();
		});

	}
})();
