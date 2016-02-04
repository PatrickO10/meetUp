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
			logOutUser: logOutUser,
			removeEvent: removeEvent
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

		function removeEvent(eid, eventsId) {
			var eventRef = eventsId.child(eid);
			eventRef.remove();
		}

		function setOnAuth(authDataCallback) {
			ref.onAuth(authDataCallback);
		}

		function logOutUser() {
			ref.unauth();
		}

	}

})();
