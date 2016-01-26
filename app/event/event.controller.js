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
