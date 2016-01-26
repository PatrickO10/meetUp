(function(){
	'use strict';

	angular
		.module('app', ['app.dashboard', 'app.login', 'app.fbAuth'])
		.constant('FBURL', 'https://vivid-torch-762.firebaseio.com/');
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

		// Callback sets user's events.
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

	}
})();

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
(function() {
	'use strict';

	angular
		.module('app.fbAuth')
		.service('authService', authService);

	authService.$inject = ['$firebase', 'FBURL', '$q'];

	function authService($firebase, FBURL, $q) {
		var ref = new Firebase(FBURL);
		var services = {
			saveNewUser: saveNewUser,
			user: user,
			isLoggedIn: isLoggedIn,
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

		function user() {
			ref.getAuth();
		}

		function isLoggedIn() {
			return !!ref.getAuth();
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
					}, cb);
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

		function logOutUser(){
			ref.unauth();
		}

	}

})();
