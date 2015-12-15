var submitSignUp = document.getElementById('submitSignUp');
var submitLogin = document.getElementById('submitLogin');
var logPass = document.getElementById('logPass');
var logEmail = document.getElementById('logEmail');


function didIt() {
	var logPassInput = logPass.value,
		logEmailInput = logEmail.value;
	alert("CLICKED IT!\n" + logPassInput + "\n" + logEmailInput);
}