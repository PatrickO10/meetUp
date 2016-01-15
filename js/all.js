function TrackIssues(){this.issues=[]}function TrackIssues(){this.issues=[]}function TrackIssues(){this.issues=[]}function TrackIssues(){this.issues=[]}function TrackIssues(){this.issues=[]}var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;TrackIssues.prototype={addIssues:function(e){this.issues.push(e)},retrieveIssues:function(){var e="";return 1===this.issues.length?e="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(e="The following issues need to be corrected:\n"+this.issues.join("\n")),e}},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var e=angular.module("meetupEventApp",["firebase"]);e.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(e,s){var t=new Firebase("https://vivid-torch-762.firebaseio.com/"),r=this;r.master={},r.masterUser={},r.masterEvent={},r.userRef="",r.user={eventLoc:""},r.userEvents="";var a=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(a),autocomplete.addListener("place_changed",function(){var e=autocomplete.getPlace();r.user.eventLoc=e.formatted_address}),r.createEvent=function(e){r.masterEvent=angular.copy(e),""===r.userRef?(console.log("Please login to continue"),r.loginFirst=!0):(r.loginFirst=!1,r.userEvents.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.user.eventLoc,guests:r.masterEvent.guests}),r.newEvent={},$("#newEventForm")[0].reset(),$(".newEvent").modal("hide"))},r.login=function(a){r.master=angular.copy(a),r.master.email&&r.master.pass&&t.authWithPassword({email:r.master.email,password:r.master.pass},function(a,o){if(a){switch(r.loginError=!0,a.code){case"INVALID_PASSWORD":r.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":r.loginErrMsg="Error: The specified user does not exist.";break;default:r.loginErrMsg=a.code}e.$apply()}else console.log("Authenticated successfully with payload:",o),r.loginError=!1,r.userRef=t.child("users").child(o.uid),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents),$("#loginForm")[0].reset(),$(".login").modal("hide")})},r.signUp=function(e){function a(){r.masterUser.fPassword.length<8?o.addIssues("fewer than 8 characters"):r.masterUser.fPassword.length>50&&o.addIssues("greater than 50 characters"),r.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)||o.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),r.masterUser.fPassword.match(/\d/g)||o.addIssues("missing a number"),r.masterUser.fPassword.match(/[a-z]/g)||o.addIssues("missing a lowercase letter"),r.masterUser.fPassword.match(/[A-Z]/g)||o.addIssues("missing an uppercase letter");var e=r.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);e&&e.forEach(function(e){o.addIssues("includes bad character: "+e)})}r.masterUser=angular.copy(e);var o=new TrackIssues,n=new TrackIssues;r.masterUser.fPassword===r.masterUser.sPassword&&r.masterUser.fPassword.length>0?a():n.addIssues("Passwords must match!");var i=o.retrieveIssues(),u=n.retrieveIssues();firstPasswordEl.setCustomValidity(i),secondPasswordEl.setCustomValidity(u),i.length||u.length||t.createUser({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Error creating user:",e):(console.log("Successfully created user account with uid:",a.uid),t.authWithPassword({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:",a),r.userRef=t.child("users").child(a.uid),r.userRef.set({provider:a.provider,name:r.masterUser.fname,email:r.masterUser.email}),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents))}),$("#signUpForm")[0].reset(),$(".signUp").modal("hide"))})}}])}();var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;TrackIssues.prototype={addIssues:function(e){this.issues.push(e)},retrieveIssues:function(){var e="";return 1===this.issues.length?e="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(e="The following issues need to be corrected:\n"+this.issues.join("\n")),e}},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var e=angular.module("meetupEventApp",["firebase"]);e.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(e,s){var t=new Firebase("https://vivid-torch-762.firebaseio.com/"),r=this;r.master={},r.masterUser={},r.masterEvent={},r.userRef="",r.user={eventLoc:""},r.userEvents="";var a=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(a),autocomplete.addListener("place_changed",function(){var e=autocomplete.getPlace();r.user.eventLoc=e.formatted_address}),r.createEvent=function(e){r.masterEvent=angular.copy(e),""===r.userRef?(console.log("Please login to continue"),r.loginFirst=!0):(r.loginFirst=!1,r.userEvents.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.user.eventLoc,guests:r.masterEvent.guests}),r.newEvent={},$("#newEventForm")[0].reset(),$(".newEvent").modal("hide"))},r.login=function(a){r.master=angular.copy(a),r.master.email&&r.master.pass&&t.authWithPassword({email:r.master.email,password:r.master.pass},function(a,o){if(a){switch(r.loginError=!0,a.code){case"INVALID_PASSWORD":r.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":r.loginErrMsg="Error: The specified user does not exist.";break;default:r.loginErrMsg=a.code}e.$apply()}else console.log("Authenticated successfully with payload:",o),r.loginError=!1,r.userRef=t.child("users").child(o.uid),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents),$("#loginForm")[0].reset(),$(".login").modal("hide")})},r.signUp=function(e){function a(){r.masterUser.fPassword.length<8?o.addIssues("fewer than 8 characters"):r.masterUser.fPassword.length>50&&o.addIssues("greater than 50 characters"),r.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)||o.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),r.masterUser.fPassword.match(/\d/g)||o.addIssues("missing a number"),r.masterUser.fPassword.match(/[a-z]/g)||o.addIssues("missing a lowercase letter"),r.masterUser.fPassword.match(/[A-Z]/g)||o.addIssues("missing an uppercase letter");var e=r.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);e&&e.forEach(function(e){o.addIssues("includes bad character: "+e)})}r.masterUser=angular.copy(e);var o=new TrackIssues,n=new TrackIssues;r.masterUser.fPassword===r.masterUser.sPassword&&r.masterUser.fPassword.length>0?a():n.addIssues("Passwords must match!");var i=o.retrieveIssues(),u=n.retrieveIssues();firstPasswordEl.setCustomValidity(i),secondPasswordEl.setCustomValidity(u),i.length||u.length||t.createUser({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Error creating user:",e):(console.log("Successfully created user account with uid:",a.uid),t.authWithPassword({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:",a),r.userRef=t.child("users").child(a.uid),r.userRef.set({provider:a.provider,name:r.masterUser.fname,email:r.masterUser.email}),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents))}),$("#signUpForm")[0].reset(),$(".signUp").modal("hide"))})}}])}();var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;TrackIssues.prototype={addIssues:function(e){this.issues.push(e)},retrieveIssues:function(){var e="";return 1===this.issues.length?e="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(e="The following issues need to be corrected:\n"+this.issues.join("\n")),e}},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var e=angular.module("meetupEventApp",["firebase"]);e.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(e,s){var t=new Firebase("https://vivid-torch-762.firebaseio.com/"),r=this;r.master={},r.masterUser={},r.masterEvent={},r.userRef="",r.user={eventLoc:""},r.userEvents="";var a=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(a),autocomplete.addListener("place_changed",function(){var e=autocomplete.getPlace();r.user.eventLoc=e.formatted_address}),r.createEvent=function(e){r.masterEvent=angular.copy(e),""===r.userRef?(console.log("Please login to continue"),r.loginFirst=!0):(r.loginFirst=!1,r.userEvents.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.user.eventLoc,guests:r.masterEvent.guests}),r.newEvent={},$("#newEventForm")[0].reset(),$(".newEvent").modal("hide"))},r.login=function(a){r.master=angular.copy(a),r.master.email&&r.master.pass&&t.authWithPassword({email:r.master.email,password:r.master.pass},function(a,o){if(a){switch(r.loginError=!0,a.code){case"INVALID_PASSWORD":r.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":r.loginErrMsg="Error: The specified user does not exist.";break;default:r.loginErrMsg=a.code}e.$apply()}else console.log("Authenticated successfully with payload:",o),r.loginError=!1,r.userRef=t.child("users").child(o.uid),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents),$("#loginForm")[0].reset(),$(".login").modal("hide")})},r.signUp=function(e){function a(){r.masterUser.fPassword.length<8?o.addIssues("fewer than 8 characters"):r.masterUser.fPassword.length>50&&o.addIssues("greater than 50 characters"),r.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)||o.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),r.masterUser.fPassword.match(/\d/g)||o.addIssues("missing a number"),r.masterUser.fPassword.match(/[a-z]/g)||o.addIssues("missing a lowercase letter"),r.masterUser.fPassword.match(/[A-Z]/g)||o.addIssues("missing an uppercase letter");var e=r.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);e&&e.forEach(function(e){o.addIssues("includes bad character: "+e)})}r.masterUser=angular.copy(e);var o=new TrackIssues,n=new TrackIssues;r.masterUser.fPassword===r.masterUser.sPassword&&r.masterUser.fPassword.length>0?a():n.addIssues("Passwords must match!");var i=o.retrieveIssues(),u=n.retrieveIssues();firstPasswordEl.setCustomValidity(i),secondPasswordEl.setCustomValidity(u),i.length||u.length||t.createUser({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Error creating user:",e):(console.log("Successfully created user account with uid:",a.uid),t.authWithPassword({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:",a),r.userRef=t.child("users").child(a.uid),r.userRef.set({provider:a.provider,name:r.masterUser.fname,email:r.masterUser.email}),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents))}),$("#signUpForm")[0].reset(),$(".signUp").modal("hide"))})}}])}();var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;TrackIssues.prototype={addIssues:function(e){this.issues.push(e)},retrieveIssues:function(){var e="";return 1===this.issues.length?e="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(e="The following issues need to be corrected:\n"+this.issues.join("\n")),e}},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var e=angular.module("meetupEventApp",["firebase"]);e.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(e,s){var t=new Firebase("https://vivid-torch-762.firebaseio.com/"),r=this;r.master={},r.masterUser={},r.masterEvent={},r.userRef="",r.user={eventLoc:""},r.userEvents="";var a=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(a),autocomplete.addListener("place_changed",function(){var e=autocomplete.getPlace();r.user.eventLoc=e.formatted_address}),r.loggedStatus=!1,r.createEvent=function(e){r.masterEvent=angular.copy(e),""===r.userRef?(console.log("Please login to continue"),r.loginFirst=!0):(r.loginFirst=!1,r.userEvents.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.user.eventLoc,guests:r.masterEvent.guests}),r.newEvent={},$("#newEventForm")[0].reset(),$(".newEvent").modal("hide"))},r.login=function(a){r.master=angular.copy(a),r.master.email&&r.master.pass&&t.authWithPassword({email:r.master.email,password:r.master.pass},function(a,o){if(a){switch(r.loginError=!0,a.code){case"INVALID_PASSWORD":r.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":r.loginErrMsg="Error: The specified user does not exist.";break;default:r.loginErrMsg=a.code}e.$apply()}else console.log("Authenticated successfully with payload:",o),r.loginError=!1,r.userRef=t.child("users").child(o.uid),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents),$("#loginForm")[0].reset(),$(".login").modal("hide")})},r.signUp=function(e){function a(){r.masterUser.fPassword.length<8?o.addIssues("fewer than 8 characters"):r.masterUser.fPassword.length>50&&o.addIssues("greater than 50 characters"),r.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)||o.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),r.masterUser.fPassword.match(/\d/g)||o.addIssues("missing a number"),r.masterUser.fPassword.match(/[a-z]/g)||o.addIssues("missing a lowercase letter"),r.masterUser.fPassword.match(/[A-Z]/g)||o.addIssues("missing an uppercase letter");var e=r.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);e&&e.forEach(function(e){o.addIssues("includes bad character: "+e)})}r.masterUser=angular.copy(e);var o=new TrackIssues,n=new TrackIssues;r.masterUser.fPassword===r.masterUser.sPassword&&r.masterUser.fPassword.length>0?a():n.addIssues("Passwords must match!");var i=o.retrieveIssues(),u=n.retrieveIssues();firstPasswordEl.setCustomValidity(i),secondPasswordEl.setCustomValidity(u),i.length||u.length||t.createUser({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Error creating user:",e):(console.log("Successfully created user account with uid:",a.uid),t.authWithPassword({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:",a),r.userRef=t.child("users").child(a.uid),r.userRef.set({provider:a.provider,name:r.masterUser.fname,email:r.masterUser.email}),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents))}),$("#signUpForm")[0].reset(),$(".signUp").modal("hide"))})}}])}();var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;TrackIssues.prototype={addIssues:function(e){this.issues.push(e)},retrieveIssues:function(){var e="";return 1===this.issues.length?e="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(e="The following issues need to be corrected:\n"+this.issues.join("\n")),e}},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var e=angular.module("meetupEventApp",["firebase"]);e.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(e,s){var t=new Firebase("https://vivid-torch-762.firebaseio.com/"),r=this;r.master={},r.masterUser={},r.masterEvent={},r.userRef="",r.user={eventLoc:""},r.userEvents="";var a=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(a),autocomplete.addListener("place_changed",function(){var e=autocomplete.getPlace();r.user.eventLoc=e.formatted_address}),r.loggedStatus=!1,r.createEvent=function(e){r.masterEvent=angular.copy(e),""===r.userRef?(console.log("Please login to continue"),r.loginFirst=!0):(r.loginFirst=!1,r.userEvents.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.user.eventLoc,guests:r.masterEvent.guests}),r.newEvent={},$("#newEventForm")[0].reset(),$(".newEvent").modal("hide"))},r.login=function(a){r.master=angular.copy(a),r.master.email&&r.master.pass&&t.authWithPassword({email:r.master.email,password:r.master.pass},function(a,o){if(a){switch(r.loginError=!0,a.code){case"INVALID_PASSWORD":r.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":r.loginErrMsg="Error: The specified user does not exist.";break;default:r.loginErrMsg=a.code}e.$apply()}else console.log("Authenticated successfully with payload:",o),r.loginError=!1,r.userRef=t.child("users").child(o.uid),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents),$("#loginForm")[0].reset(),$(".login").modal("hide")})},r.signUp=function(e){function a(){r.masterUser.fPassword.length<8?o.addIssues("fewer than 8 characters"):r.masterUser.fPassword.length>50&&o.addIssues("greater than 50 characters"),r.masterUser.fPassword.match(/[\!\@\#\$\%\^\&\*]/g)||o.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),r.masterUser.fPassword.match(/\d/g)||o.addIssues("missing a number"),r.masterUser.fPassword.match(/[a-z]/g)||o.addIssues("missing a lowercase letter"),r.masterUser.fPassword.match(/[A-Z]/g)||o.addIssues("missing an uppercase letter");var e=r.masterUser.fPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);e&&e.forEach(function(e){o.addIssues("includes bad character: "+e)})}r.masterUser=angular.copy(e);var o=new TrackIssues,n=new TrackIssues;r.masterUser.fPassword===r.masterUser.sPassword&&r.masterUser.fPassword.length>0?a():n.addIssues("Passwords must match!");var i=o.retrieveIssues(),u=n.retrieveIssues();firstPasswordEl.setCustomValidity(i),secondPasswordEl.setCustomValidity(u),i.length||u.length||t.createUser({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Error creating user:",e):(console.log("Successfully created user account with uid:",a.uid),t.authWithPassword({email:r.masterUser.email,password:r.masterUser.fPassword},function(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:",a),r.userRef=t.child("users").child(a.uid),r.userRef.set({provider:a.provider,name:r.masterUser.fname,email:r.masterUser.email}),r.userEvents=r.userRef.child("events"),r.eventsArray=s(r.userEvents))}),$("#signUpForm")[0].reset(),$(".signUp").modal("hide"))})}}])}();
var submitSignUp = document.getElementById('submitSignUp'),
	submitLogin = document.getElementById('submitLogin'),
	logPass = document.getElementById('logPass'),
	logEmail = document.getElementById('logEmail'),
	firstPasswordEl = document.getElementById('fPassword'),
	secondPasswordEl = document.getElementById('sPassword'),
	autocomplete;
/*
function initAutocomplete() {
	var input = document.getElementById('loc-input');
	// Create the autocomplete object
	autocomplete = new google.maps.places.Autocomplete(input);

	autocomplete.addListener('place_changed', fillInAddress);
}
*/
// This will track issues.
function TrackIssues() {
	this.issues = [];
}

TrackIssues.prototype = {
	// Method to add issues to the this.issues array.
	addIssues: function(issue) {
		this.issues.push(issue);
	},
	// Method to retrieve issues.
	retrieveIssues: function() {
		var msg = "";
		if (this.issues.length === 1) {
			msg = "The following issue needs to be corrected:\n" + this.issues[0];
		} else if (this.issues.length > 1) {
			msg = "The following issues need to be corrected:\n" + this.issues.join("\n");
		}
		return msg;
	}
};


// Since autofocus doesn't work with bootstrap modals, I am using this code from Bootstrap JS to replace it
// for autofocus.
$('.signUp, .newEvent, .login').on('shown.bs.modal', function() {
	$('#fname').focus();
	$('#eName').focus();
	$('#logEmail').focus();
});

(function() {
	"use strict";
	var meetupEventApp = angular.module('meetupEventApp', ['firebase']);

	meetupEventApp.controller('MeetupEventCtrl', ['$scope', '$firebaseArray',
		function($scope, $firebaseArray) {
			var ref = new Firebase("https://vivid-torch-762.firebaseio.com/");
			var self = this;
			self.master = {};
			self.masterUser = {};
			self.masterEvent = {};
			self.userRef = '';
			self.user = {
				eventLoc: ''
			};
			self.userEvents = '';
			var input = document.getElementById('loc-input');
			// Create the autocomplete object
			autocomplete = new google.maps.places.Autocomplete(input);

			// Add listener so address changes and can be pushed to create event.
			autocomplete.addListener('place_changed', function() {
				var place = autocomplete.getPlace();
				self.user.eventLoc = place.formatted_address;
			});
			$scope.loggedStatus = false;

			// create a new event and store it in user's profile.
			self.createEvent = function(newEvent) {
				self.masterEvent = angular.copy(newEvent);
				if (self.userRef === '') {
					console.log("Please login to continue");
					self.loginFirst = true;
				} else {
					self.loginFirst = false;
					// Convert date to strings.
					self.userEvents.push({
						name: self.masterEvent.name,
						type: self.masterEvent.type,
						host: self.masterEvent.host,
						startDate: self.masterEvent.startDate.getTime(),
						endDate: self.masterEvent.endDate.getTime(),
						location: self.user.eventLoc,
						guests: self.masterEvent.guests
					});
					self.newEvent = {};
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
							self.loginError = true;
							switch (error.code) {
								case "INVALID_PASSWORD":
									self.loginErrMsg = "Error: The specified password is incorrect.";
									break;
								case "INVALID_USER":
									self.loginErrMsg = "Error: The specified user does not exist.";
									break;
								default:
									self.loginErrMsg = error.code;
							}
							$scope.$apply();
						} else {
							console.log("Authenticated successfully with payload:", authData);
							self.loginError = false;
							self.userRef = ref.child("users").child(authData.uid);
							self.userEvents = self.userRef.child("events");
							self.eventsArray = $firebaseArray(self.userEvents);
							$('#loginForm')[0].reset();
							$('.login').modal('hide');
						}
					});
				}
			};
			self.signUp = function(newUser) {
				self.masterUser = angular.copy(newUser);

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
							}, function(error, authData) {
								if (error) {
									console.log("Login Failed!", error);
								} else {
									console.log("Authenticated successfully with payload:", authData);
									self.userRef = ref.child("users").child(authData.uid);
									self.userRef.set({
										provider: authData.provider,
										name: self.masterUser.fname,
										email: self.masterUser.email
									});
									self.userEvents = self.userRef.child("events");
									self.eventsArray = $firebaseArray(self.userEvents);
								}
							});
							// save the user's profile into the database so we can list users,
							// use them in Security and Firebase Rules, and show events
							$('#signUpForm')[0].reset();
							$('.signUp').modal('hide');
						}
					});
				}
			};
		}
	]);
})();
