(function() {
	'use strict';

	angular
		.module('app.register')
		.controller('RegisterCtrl', RegisterCtrl);

	RegisterCtrl.$inject = ['authService'];

	function RegisterCtrl(authService) {
		var self = this;

		// Password Booleans to either display or hide instructions for ngHide.
		self.charLen = false;
		self.symbols = false;
		self.missNumber = false;
		self.lowerCase = false;
		self.upperCase = false;
		self.pwdsMatch = false;

		// Boolean for create user error messages
		self.registerErr = false;
		self.registerErrMsg = '';


		self.signUp = function(user) {
			self.newUserObj = angular.copy(user);

			self.userObject = {
				email: self.newUserObj.email,
				password: self.newUserObj.password,
				name: self.newUserObj.fname,
				gender: self.newUserObj.gender || '',
				birthday: self.newUserObj.birthday.toLocaleDateString() || ''
			};

			authService.createUser(self.userObject).then(function(authData) {
				self.registerErr = false;
				self.registerErrMsg = '';

				$('#signUpForm')[0].reset();
				$('.signUp').modal('hide');
			}, function(error) {
				self.registerErr = true;
				self.registerErrMsg += error;
			});
		};

		self.checkPassword = function() {
			var pwEl = document.getElementById('fPassword');
			var pwInput = pwEl.value;

			var secondPwEl = document.getElementById('sPassword');
			var secondPwInput = secondPwEl.value;

			// Character Lengths
			if (pwInput.length >= 8 && pwInput.length <= 50) {
				self.charLen = true;
			} else {
				self.charLen = false;
			}

			// Symbols
			if (pwInput.match(/[\!\@\#\$\%\^\&\*]/g)) {
				self.symbols = true;
			} else {
				self.symbols = false;
			}

			// Missing Number
			if (pwInput.match(/\d/g)) {
				self.missNumber = true;
			} else {
				self.missNumber = false;
			}

			// Check lowercase
			if (pwInput.match(/[a-z]/g)) {
				self.lowerCase = true;
			} else {
				self.lowerCase = false;
			}

			// Check uppercase
			if (pwInput.match(/[A-Z]/g)) {
				self.upperCase = true;
			} else {
				self.upperCase = false;
			}

			// Check if passwords match.
			if (pwInput === secondPwInput) {
				self.pwdsMatch = true;
			} else {
				self.pwdsMatch = false;
			}
		};
	}
})();
