(function() {
	"use strict";
	var meetupEventApp = angular.module('meetupEventApp', ['firebase']);

	meetupEventApp.controller('MeetupEventCtrl', ['$firebaseArray',
		function($firebaseArray) {
			var ref = new Firebase("https://vivid-torch-762.firebaseio.com/");
			var self = this;
			//self.eventsArray = $firebaseArray(ref);
			self.master = {};
			self.masterUser = {};
			self.masterEvent = {};
			self.userRef = '';
			self.user = {
				eventLoc: ''
			};

			var input = document.getElementById('loc-input');
			// Create the autocomplete object
			autocomplete = new google.maps.places.Autocomplete(input);

			autocomplete.addListener('place_changed', function() {
				var place = autocomplete.getPlace();
				self.user.eventLoc = place.formatted_address;
			});

			// create a new event and store it in user's profile.
			self.createEvent = function(newEvent) {
				self.masterEvent = angular.copy(newEvent);
				if (self.userRef === '') {
					console.log("Please login to continue");
				} else {
					self.userEvents = self.userRef.child("events");
					// Convert date to strings.
					var start = self.masterEvent.startDate.toString(),
						end = self.masterEvent.endDate.toString();
					self.userEvents.push({
						name: self.masterEvent.name,
						type: self.masterEvent.type,
						host: self.masterEvent.host,
						startDate: start,
						endDate: end,
						location: self.user.eventLoc,
						guests: self.masterEvent.guests
					});
					$('#newEventForm')[0].reset();
					$('.newEvent').modal('hide');
				}
			};
			self.login = function(user) {
				self.master = angular.copy(user);
				if (self.master.email && self.master.pass) {
					ref.authWithPassword({
						email: self.master.email,
						password: self.master.pass
					}, function(error, authData) {
						if (error) {
							console.log("Login Failed!", error);
						} else {
							console.log("Authenticated successfully with payload:", authData);
							self.userRef = ref.child("users").child(authData.uid);
							console.log(self.userRef);
							$('#loginForm')[0].reset();
							$('.login').modal('hide');
						}
					});
				}
			};
			self.signUp = function(newUser) {
				self.masterUser = angular.copy(newUser);
				// Create a callback to handle the result of the authentication
				function authHandler(error, authData) {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						console.log("Authenticated successfully with payload:", authData);
						// save the user's profile into the database so we can list users,
						// use them in Security and Firebase Rules, and show events
						self.userRef = ref.child("users").child(authData.uid);
						self.userRef.set({
							provider: authData.provider,
							name: self.masterUser.fname
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

				if (self.masterUser.fPassword === self.masterUser.sPassword && self.masterUser.fPassword.length > 0) {
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
						email: self.masterUser.email,
						password: self.masterUser.fPassword
					}, function(error, userData) {
						if (error) {
							console.log("Error creating user:", error);
						} else {
							console.log("Successfully created user account with uid:", userData.uid);
							ref.authWithPassword({
								email: self.masterUser.email,
								password: self.masterUser.fPassword
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
