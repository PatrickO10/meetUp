(function() {
	"use strict";
	var meetupEventApp = angular.module('meetupEventApp', ['firebase']);

	meetupEventApp.controller('MeetupEventCtrl', ['$scope', '$firebaseArray',
		function($scope, $firebaseArray) {
			var ref = new Firebase("https://vivid-torch-762.firebaseio.com/");
			//$scope.eventsArray = $firebaseArray(ref);
			$scope.master = {};
			$scope.masterUser = {};
			$scope.login = function(user) {
				$scope.master = angular.copy(user);
				if ($scope.master.email && $scope.master.pass) {
					ref.authWithPassword({
						email: $scope.master.email,
						password: $scope.master.pass
					}, function(error, authData) {
						if (error) {
							console.log("Login Failed!", error);
						} else {
							console.log("Authenticated successfully with payload:", authData);
							$('#loginForm')[0].reset();
							$('.login').modal('hide');
						}
					});
				}
			};
			$scope.signUp = function(newUser) {
				$scope.masterUser = angular.copy(newUser);
				// Create a callback to handle the result of the authentication
				function authHandler(error, authData) {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						console.log("Authenticated successfully with payload:", authData);
						// save the user's profile into the database so we can list users,
						// use them in Security and Firebase Rules, and show profiles
						ref.child("users").child(authData.uid).set({
							provider: authData.provider,
							name: $scope.masterUser.fname
						});
					}
				}

				/*
				 * Make an issue tracker for each password input to have two separate issue trackers.
				 */
				var firstPasswordInputIssuesTracker = new TrackIssues(),
					secondPasswordInputIssuesTracker = new TrackIssues();

				/*
				 * Checks to make sure first password doesn't have any issues.
				 */
				function checkPasswords() {
					if ($scope.masterUser.fPassword.length < 8) {
						firstPasswordInputIssuesTracker.addIssues("fewer than 8 characters");
					} else if ($scope.masterUser.fPassword.length > 50) {
						firstPasswordInputIssuesTracker.addIssues("greater than 50 characters");
					}

					if (!$scope.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)");
					}

					if (!$scope.masterUser.fPassword.match(/\d/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a number");
					}

					if (!$scope.masterUser.fPassword.match(/[a-z]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing a lowercase letter");
					}

					if (!$scope.masterUser.fPassword.match(/[A-Z]/g)) {
						firstPasswordInputIssuesTracker.addIssues("missing an uppercase letter");
					}

					var badCharacterGroup = $scope.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
					if (badCharacterGroup) {
						badCharacterGroup.forEach(function(badChar) {
							firstPasswordInputIssuesTracker.addIssues("includes bad character: " + badChar);
						});
					}
				}

				if ($scope.masterUser.fPassword === $scope.masterUser.sPassword && $scope.masterUser.fPassword.length > 0) {
					// If they match call checkPasswords to make sure it matches the rest of the requirements.
					checkPasswords();
				} else {
					secondPasswordInputIssuesTracker.addIssues("Passwords must match!");
				}
				/*
				 * Retrieve validation message strings once all requirements are checked.
				 */
				var firstPasswordInputIssues = firstPasswordInputIssuesTracker.retrieveIssues();
				var secondPasswordInputIssues = secondPasswordInputIssuesTracker.retrieveIssues();
				firstPasswordEl.setCustomValidity(firstPasswordInputIssues);
				secondPasswordEl.setCustomValidity(secondPasswordInputIssues);
				// If first or second password have no issues then create the user!
				if (!firstPasswordInputIssues.length && !secondPasswordInputIssues.length) {
					ref.createUser({
						email: $scope.masterUser.email,
						password: $scope.masterUser.fPassword
					}, function(error, userData) {
						if (error) {
							console.log("Error creating user:", error);
						} else {
							console.log("Successfully created user account with uid:", userData.uid);
							ref.authWithPassword({
								email: $scope.masterUser.email,
								password: $scope.masterUser.fPassword
							}, authHandler);
							$('#signUpForm')[0].reset();
							$('.signUp').modal('hide');
						}
					});
				}
			};
		}
	]);
})();
