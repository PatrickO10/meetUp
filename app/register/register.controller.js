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
			var bday = '',
				gender = '';

			if (self.newUserObj.birthday) {
				bday = self.newUserObj.birthday.toLocaleDateString();
			}

			if (self.newUserObj.gender) {
				gender = self.newUserObj.gender;
			}

			self.userObject = {
				email: self.newUserObj.email,
				password: self.newUserObj.password,
				name: self.newUserObj.fname,
				gender: gender,
				birthday: bday
			};

			authService.createUser(self.userObject).then(function(authData) {
				self.registerErr = false;
				self.registerErrMsg = '';

				// Password Booleans set to false.
				self.charLen = false;
				self.symbols = false;
				self.missNumber = false;
				self.lowerCase = false;
				self.upperCase = false;
				self.pwdsMatch = false;

				// Resets the object to empty strings.
				for (var item in user) {
					user[item] = '';
				}

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

			// Check for Character Lengths
			self.charLen = /^[A-Za-z0-9\!\@\#\$\%\^\&\*]{8,50}/.test(pwInput);

			// Check for Symbols
			self.symbols = /[\!\@\#\$\%\^\&\*]/g.test(pwInput);

			// Check for Number
			self.missNumber = /\d/g.test(pwInput);

			// Check for Lowercase Letter
			self.lowerCase = /[a-z]/g.test(pwInput);

			// Check for Uppercase Letter
			self.upperCase = /[A-Z]/g.test(pwInput);

			// Check if passwords match.
			self.pwdsMatch = (pwInput === secondPwInput) ? true : false;
		};
	}
})();
