var submitSignUp = document.getElementById('submitSignUp'),
	submitLogin = document.getElementById('submitLogin'),
	logPass = document.getElementById('logPass'),
	logEmail = document.getElementById('logEmail'),
	firstPasswordEl = document.getElementById('fPassword'),
	secondPasswordEl = document.getElementById('sPassword'),
	autocomplete;

function initAutocomplete() {
	var input = document.getElementById('loc-input');
	// Create the autocomplete object
	autocomplete = new google.maps.places.Autocomplete(input);
}

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
