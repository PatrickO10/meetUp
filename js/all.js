(function() {
	'use strict';

	angular
		.module('app', ['app.dashboard', 'app.login', 'app.fbAuth', 'app.event', 'app.register', 'ngMessages'])
		.constant('FBURL', 'https://vivid-torch-762.firebaseio.com/');
})();

(function(){
	'use strict';

	angular.module('app.event', []);
})();
(function(){
	'use strict';

	angular.module('app.dashboard', ['firebase']);
})();
(function(){
	'use strict';

	angular.module('app.fbAuth', ['firebase']);

})();
(function(){
	'use strict';

	angular.module('app.login', ['firebase']);

})();
(function(){
	'use strict';

	angular
		.module('app.register', []);
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
		self.userObj = authService.getUserAuth();
		// Variable used for when pushing to the user's events.
		self.userEventRef = authService.setEventRef(self.userObj.uid);

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
			console.log(self.masterUser);
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

	RegisterCtrl.$inject = ['authService', '$scope'];

	function RegisterCtrl(authService, $scope) {
		var self = this;
		self.firstPwIssues = '';
		self.secondPwIssues = '';
		self.checkPass = {};
		self.charLen = false;
		self.symbols = false;


		self.signUp = function(user) {
			self.newUserObj = angular.copy(user);
			authService.createUser(self.newUserObj);

			$('#signUpForm')[0].reset();
			$('.signUp').modal('hide');
		};

		self.checkPassword = function() {
			var pwEl = angular.element(document.getElementById('fPassword'));
			var pwInput = pwEl;

			var msg = '';
			console.log(pwInput);
			if (pwInput.length >= 8 && pwInput.length <= 50) {
				self.charLen = true;
				msg += "fewer than 8 characters\n";
			} else {
				self.charLen = false;
			}
			if (!pwInput.match(/[\!\@\#\$\%\^\&\*]/g)) {
				self.symbols = true;
				msg += "missing a symbol (!, @, #, $, %, ^, &, *)";
			} else {
				self.symbols = false;
			}

		};
		/*
				function checkPasswords(userObj) {
					if (self.masterUser.fPassword.length < 8) {
						firstPasswordInputIssuesTracker.addIssues("fewer than 8 characters");
					} else if (self.masterUser.fPassword.length > 50) {
						firstPasswordInputIssuesTracker.addIssues("greater than 50 characters");
					}

					if (!self.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)");
					}

					if (!self.masterUser.fPassword.match(/\d/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a number");
					}

					if (!self.masterUser.fPassword.match(/[a-z]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a lowercase letter");
					}

					if (!self.masterUser.fPassword.match(/[A-Z]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing an uppercase letter");
					}

					var badCharacterGroup = self.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
					if (badCharacterGroup) {
						badCharacterGroup.forEach(function(badChar) {
							firstPasswordInputIssuesTracker.addIssues("includes bad character: " + badChar);
						});
					}
				}
		*/
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

		function saveNewUser(userObj) {
			ref.child('users').child(userObj.id).set(userObj);
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
			});
			return defered.promise;
		}

		function createUser(user, cb) {
			ref.createUser(user, function(error, authData) {
				if (error) {
					console.log("Yo, Error: ", error);
				} else {
					loginWithPwd(user, function(authData) {
						saveNewUser(authData);
					});
				}
			});
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

(function() {
	'use strict';

	angular
		.module('app.register')
		.factory('issuesTracker', issuesTracker);

	function issuesTracker() {
		var services = {
			retrieveIssues: retrieveIssues
		};
		return services;

		function retrieveIssues(issues) {
			var msg = "";
			if (issues.length === 1) {
				msg = "The following issue needs to be corrected:\n" + issues[0];
			} else if (issues.length > 1) {
				msg = "The following issues need to be corrected:\n" + issues.join("\n");
			}
			return msg;
		}
	}
})();
