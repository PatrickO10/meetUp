var submitSignUp = document.getElementById('submitSignUp');
var submitLogin = document.getElementById('submitLogin');
var logPass = document.getElementById('logPass');
var logEmail = document.getElementById('logEmail');
var autocomplete;

function didIt() {
    var logPassInput = logPass.value,
        logEmailInput = logEmail.value;
    alert("CLICKED IT!\n" + logPassInput + "\n" + logEmailInput);
}

function initAutocomplete() {
    var input = document.getElementById('loc-input');
    // Create the autocomplete object
    autocomplete = new google.maps.places.Autocomplete(input);
}