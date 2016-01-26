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

		function logOutUser() {
			ref.unauth();
		}

	}

})();
