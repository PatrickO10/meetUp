var submitSignUp = document.getElementById('submitSignUp'),
    submitLogin = document.getElementById('submitLogin'),
    logPass = document.getElementById('logPass'),
    logEmail = document.getElementById('logEmail'),
    firstPasswordEl = document.getElementById('fPassword'),
    secondPasswordEl = document.getElementById('sPassword');

var autocomplete;
function initAutocomplete() {
    var input = document.getElementById('loc-input');
    // Create the autocomplete object
    autocomplete = new google.maps.places.Autocomplete(input);
}

// This will track issues.
function trackIssues() {
    this.issues = [];
}

trackIssues.prototype = {
    // Method to add issues to the this.issues array.
    addIssues: function(issue) {
        this.issues.push(issue);
    },
    // Method to retrieve issues.
    retrieveIssues: function() {
        var msg = "";
        if (this.issues.length === 1) {
            msg = msg = "The following issue needs to be corrected:\n" + this.issues[0];
        } else if (this.issues.length > 1) {
            msg = "The following issues need to be corrected:\n" + this.issues.join("\n");
        }
        return msg;
    }
};

submitSignUp.onclick = function() {
    var firstPasswordVal = firstPasswordEl.value,
        secondPasswordVal = secondPasswordEl.value;
    /*
     * Make an issue tracker for each password input to have two separate issue trackers.
     */
    var firstPasswordInputIssuesTracker = new trackIssues(),
        secondPasswordInputIssuesTracker = new trackIssues();

    /*
     * Checks to make sure first password doesn't have any issues.
     */
    function checkPasswords() {
        if (firstPasswordVal.length < 8) {
            firstPasswordInputIssuesTracker.addIssues("fewer than 8 characters");
        } else if (firstPasswordVal.length > 50) {
            firstPasswordInputIssuesTracker.addIssues("greater than 50 characters");
        }

        if (!firstPasswordVal.match(/[\!\@\#\$\%\^\&\*]/g)) {
            firstPasswordInputIssuesTracker.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)");
        }

        if (!firstPasswordVal.match(/\d/g)) {
            firstPasswordInputIssuesTracker.addIssues("missing a number");
        }

        if (!firstPasswordVal.match(/[a-z]/g)) {
            firstPasswordInputIssuesTracker.addIssues("missing a lowercase letter");
        }

        if (!firstPasswordVal.match(/[A-Z]/g)) {
            firstPasswordInputIssuesTracker.addIssues("missing an uppercase letter");
        }

        var badCharacterGroup = firstPasswordVal.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
        if (badCharacterGroup) {
            badCharacterGroup.forEach(function(badChar) {
                firstPasswordInputIssuesTracker.addIssues("includes bad character: " + badChar);
            });
        }
    }

    if (firstPasswordVal === secondPasswordVal && firstPasswordVal.length > 0) {
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
};

// Since autofocus doesn't work with bootstrap modals, I am using this code from Bootstrap JS to replace it
// for autofocus.
$('.signUp, .newEvent, .login').on('shown.bs.modal', function () {
  $('#fname').focus();
  $('#eName').focus();
  $('#logEmail').focus();
});