(function() {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$scope', '$rootScope', 'authService'];

	function LoginCtrl($scope, $rootScope, authService) {
		var ref = new Firebase("https://vivid-torch-762.firebaseio.com/");
		var self = this;
		self.userRef = '';
		self.masterUser = {};
		$scope.loginError = false;
		$scope.loginErrMsg = '';


		self.login = function(user) {
			self.masterUser = angular.copy(user);
			console.log(self.masterUser);
			authService.loginWithPwd(self.masterUser).then(function(authData) {
				console.log(authData);
				$('#loginForm')[0].reset();
				$('.login').modal('hide');
			}, function(error) {
				console.log("Failure");
				$scope.loginError = true;
				switch (error.code) {
					case "EMAIL_TAKEN":
						$scope.loginErrMsg = "Error: The specified email is taken";
						break;
					case "INVALID_EMAIL":
						$scope.loginErrMsg = "Error: The email you entered is invalid";
						break;
					case "INVALID_PASSWORD":
						$scope.loginErrMsg = "Error: The specified password is incorrect.";
						break;
					case "INVALID_USER":
						$scope.loginErrMsg = "Error: The specified user does not exist.";
						break;
					default:
						$scope.loginErrMsg = "Error: " + error.code;
				}
			});
		};

	}
})();