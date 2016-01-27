(function() {
	'use strict';

	angular
		.module('app', ['app.dashboard', 'app.login', 'app.fbAuth', 'app.event', 'app.register', 'ngMessages'])
		.constant('FBURL', 'https://vivid-torch-762.firebaseio.com/');
})();

(function(){
	'use strict';

	angular.module('app.dashboard', ['firebase']);
})();
(function(){
	'use strict';

	angular.module('app.event', []);
})();
(function(){
	'use strict';

	angular.module('app.login', ['firebase']);

})();
(function(){
	'use strict';

	angular.module('app.fbAuth', ['firebase']);

})();
(function(){
	'use strict';

	angular
		.module('app.register', []);
})();
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

(function() {
	'use strict';

	angular
		.module('app.event')
		.controller('EventCtrl', EventCtrl);

	EventCtrl.$inject = ['authService'];

	function EventCtrl(authService) {
		var self = this;
		self.masterEvent = {};


		// Autocomplete variables
		var input = document.getElementById('loc-input');
		self.eventLoc = '';

		// Create the autocomplete object
		self.autocomplete = new google.maps.places.Autocomplete(input);

		// Add listener so address changes and so it can be pushed to create event.
		self.autocomplete.addListener('place_changed', function() {
			var place = self.autocomplete.getPlace();
			self.eventLoc = place.formatted_address;
		});

		self.createEvent = function(eObj) {
			self.masterEvent = angular.copy(eObj);
			self.userObj = authService.getUserAuth();
			// Variable used for when pushing to the user's events.
			self.userEventRef = authService.setEventRef(self.userObj.uid);

			// Pushes the new event to Firebase.
			self.userEventRef.push({
				name: self.masterEvent.name,
				type: self.masterEvent.type,
				host: self.masterEvent.host,
				startDate: self.masterEvent.startDate.getTime(),
				endDate: self.masterEvent.endDate.getTime(),
				location: self.eventLoc,
				guests: self.masterEvent.guests,
				msg: self.masterEvent.msg || ''
			});

			eObj.msg = '';
			$('#newEventForm')[0].reset();
			$('.newEvent').modal('hide');
		};
	}
})();

(function() {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['$scope', '$rootScope', 'authService'];

	function LoginCtrl($scope, $rootScope, authService) {
		var self = this;
		self.masterUser = {};
		$scope.loginError = false;
		$scope.loginErrMsg = '';


		self.login = function(user) {
			self.masterUser = angular.copy(user);

			authService.loginWithPwd(self.masterUser).then(function(authData) {
				$scope.loginError = false;
				$scope.loginErrMsg = '';
				$('#loginForm')[0].reset();
				$('.login').modal('hide');
			}, function(error) {
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

(function() {
	'use strict';

	angular
		.module('app.fbAuth')
		.factory('authService', authService);

	authService.$inject = ['$firebase', 'FBURL', '$q'];

	function authService($firebase, FBURL, $q) {
		var ref = new Firebase(FBURL);
		var services = {
			saveNewUser: saveNewUser,
			getUserAuth: getUserAuth,
			createUser: createUser,
			loginWithPwd: loginWithPwd,
			setEventRef: setEventRef,
			setOnAuth: setOnAuth,
			logOutUser: logOutUser
		};
		return services;

		function saveNewUser(authData, userObj) {
			var setObj = {
				email: userObj.email,
				name: userObj.name,
				gender: userObj.gender || '',
				birthday: userObj.birthday || ''
			};

			ref.child('users').child(authData.uid).set(setObj);
		}

		function getUserAuth() {
			return ref.getAuth();
		}

		function loginWithPwd(userObj, cb) {
			var defered = $q.defer();
			ref.authWithPassword(userObj, function(error, authData) {
				if (error) {
					defered.reject(error);
				} else {
					defered.resolve(authData);
				}
				if (cb) {
					cb(authData, userObj);
				}
			});

			return defered.promise;
		}

		function createUser(user, cb) {
			var deferedUser = $q.defer();
			ref.createUser(user, function(error, authData) {
				if (error) {
					deferedUser.reject(error);
				} else {
					deferedUser.resolve(authData);
					loginWithPwd(user, function(authData) {
						saveNewUser(authData, user);
					});
				}
			});
			return deferedUser.promise;
		}

		// Sets the user ref
		function setEventRef(userId) {
			var userRef = ref.child("users").child(userId).child("events");
			return userRef;
		}

		function setOnAuth(authDataCallback) {
			ref.onAuth(authDataCallback);
		}

		function logOutUser() {
			ref.unauth();
		}

	}

})();
