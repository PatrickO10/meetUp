function initAutocomplete(){var s=document.getElementById("loc-input");autocomplete=new google.maps.places.Autocomplete(s)}function trackIssues(){this.issues=[]}var submitSignUp=document.getElementById("submitSignUp"),submitLogin=document.getElementById("submitLogin"),logPass=document.getElementById("logPass"),logEmail=document.getElementById("logEmail"),firstPasswordEl=document.getElementById("fPassword"),secondPasswordEl=document.getElementById("sPassword"),autocomplete;trackIssues.prototype={addIssues:function(s){this.issues.push(s)},retrieveIssues:function(){var s="";return 1===this.issues.length?s="The following issue needs to be corrected:\n"+this.issues[0]:this.issues.length>1&&(s="The following issues need to be corrected:\n"+this.issues.join("\n")),s}},submitSignUp.onclick=function(){function s(){e.length<8?a.addIssues("fewer than 8 characters"):e.length>50&&a.addIssues("greater than 50 characters"),e.match(/[\!\@\#\$\%\^\&\*]/g)||a.addIssues("missing a symbol (!, @, #, $, %, ^, &, *)"),e.match(/\d/g)||a.addIssues("missing a number"),e.match(/[a-z]/g)||a.addIssues("missing a lowercase letter"),e.match(/[A-Z]/g)||a.addIssues("missing an uppercase letter");var s=e.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);s&&s.forEach(function(s){a.addIssues("includes bad character: "+s)})}var e=firstPasswordEl.value,t=secondPasswordEl.value,a=new trackIssues,n=new trackIssues;e===t&&e.length>0?s():n.addIssues("Passwords must match!");var o=a.retrieveIssues(),i=n.retrieveIssues();firstPasswordEl.setCustomValidity(o),secondPasswordEl.setCustomValidity(i)},$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()}),function(){"use strict";var s=angular.module("meetupEventApp",["firebase"]);s.controller("MeetupEventCtrl",["$scope","$firebaseArray",function(s,e){var t=new Firebase("https://vivid-torch-762.firebaseio.com/");s.eventsArray=e(t),s.master={},s.login=function(e){s.master=angular.copy(e),s.master.email&&s.master.pass&&t.authWithPassword({email:s.master.email,password:s.master.pass},function(s,e){s?console.log("Login Failed!",s):(console.log("Authenticated successfully with payload:",e),$(".login").modal("hide"))})}}])}();