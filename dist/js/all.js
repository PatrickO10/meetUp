!function(){"use strict";angular.module("app",["app.dashboard","app.login","app.fbAuth","app.event","app.register","ngMessages"]).constant("FBURL","https://vivid-torch-762.firebaseio.com/")}(),function(){"use strict";angular.module("app.dashboard",["firebase"])}(),function(){"use strict";angular.module("app.event",[])}(),function(){"use strict";angular.module("app.fbAuth",["firebase"])}(),function(){"use strict";angular.module("app.login",["firebase"])}(),function(){"use strict";angular.module("app.register",[])}(),function(){"use strict";function e(e,r){function t(t){if(t){console.log("User "+t.uid+" is logged in with "+t.provider);var s=e.setEventRef(t.uid);n.eventsArray=r(s),n.loggedStatus=!0}else console.log("User is logged out")}var n=this;n.logOut=function(){e.logOutUser(),n.loggedStatus=!1},e.setOnAuth(t),$(".signUp, .newEvent, .login").on("shown.bs.modal",function(){$("#fname").focus(),$("#eName").focus(),$("#logEmail").focus()})}angular.module("app.dashboard").controller("MainCtrl",e),e.$inject=["authService","$firebaseArray"]}(),function(){"use strict";function e(e){var r=this;r.masterEvent={};var t=document.getElementById("loc-input");r.eventLoc="",r.autocomplete=new google.maps.places.Autocomplete(t),r.autocomplete.addListener("place_changed",function(){var e=r.autocomplete.getPlace();r.eventLoc=e.formatted_address}),r.createEvent=function(t){r.masterEvent=angular.copy(t),r.userObj=e.getUserAuth(),r.userEventRef=e.setEventRef(r.userObj.uid),r.userEventRef.push({name:r.masterEvent.name,type:r.masterEvent.type,host:r.masterEvent.host,startDate:r.masterEvent.startDate.getTime(),endDate:r.masterEvent.endDate.getTime(),location:r.eventLoc,guests:r.masterEvent.guests,msg:r.masterEvent.msg||""}),t.msg="",$("#newEventForm")[0].reset(),$(".newEvent").modal("hide")}}angular.module("app.event").controller("EventCtrl",e),e.$inject=["authService"]}(),function(){"use strict";function e(e,r,t){var n=this;n.masterUser={},e.loginError=!1,e.loginErrMsg="",n.login=function(r){n.masterUser=angular.copy(r),t.loginWithPwd(n.masterUser).then(function(r){e.loginError=!1,e.loginErrMsg="",$("#loginForm")[0].reset(),$(".login").modal("hide")},function(r){switch(e.loginError=!0,r.code){case"EMAIL_TAKEN":e.loginErrMsg="Error: The specified email is taken";break;case"INVALID_EMAIL":e.loginErrMsg="Error: The email you entered is invalid";break;case"INVALID_PASSWORD":e.loginErrMsg="Error: The specified password is incorrect.";break;case"INVALID_USER":e.loginErrMsg="Error: The specified user does not exist.";break;default:e.loginErrMsg="Error: "+r.code}})}}angular.module("app.login").controller("LoginCtrl",e),e.$inject=["$scope","$rootScope","authService"]}(),function(){"use strict";function e(e){var r=this;r.charLen=!1,r.symbols=!1,r.missNumber=!1,r.lowerCase=!1,r.upperCase=!1,r.pwdsMatch=!1,r.registerErr=!1,r.registerErrMsg="",r.signUp=function(t){r.newUserObj=angular.copy(t);var n="",s="";r.newUserObj.birthday&&(n=r.newUserObj.birthday.toLocaleDateString()),r.newUserObj.gender&&(s=r.newUserObj.gender),r.userObject={email:r.newUserObj.email,password:r.newUserObj.password,name:r.newUserObj.fname,gender:s,birthday:n},e.createUser(r.userObject).then(function(e){r.registerErr=!1,r.registerErrMsg="",r.charLen=!1,r.symbols=!1,r.missNumber=!1,r.lowerCase=!1,r.upperCase=!1,r.pwdsMatch=!1;for(var n in t)t[n]="";$("#signUpForm")[0].reset(),$(".signUp").modal("hide")},function(e){r.registerErr=!0,r.registerErrMsg+=e})},r.checkPassword=function(){var e=document.getElementById("fPassword"),t=e.value,n=document.getElementById("sPassword"),s=n.value;t.length>=8&&t.length<=50?r.charLen=!0:r.charLen=!1,t.match(/[\!\@\#\$\%\^\&\*]/g)?r.symbols=!0:r.symbols=!1,t.match(/\d/g)?r.missNumber=!0:r.missNumber=!1,t.match(/[a-z]/g)?r.lowerCase=!0:r.lowerCase=!1,t.match(/[A-Z]/g)?r.upperCase=!0:r.upperCase=!1,t===s?r.pwdsMatch=!0:r.pwdsMatch=!1}}angular.module("app.register").controller("RegisterCtrl",e),e.$inject=["authService"]}(),function(){"use strict";function e(e,r,t){function n(e,r){var t={email:r.email,name:r.name,gender:r.gender||"",birthday:r.birthday||""};l.child("users").child(e.uid).set(t)}function s(){return l.getAuth()}function a(e,r){var n=t.defer();return l.authWithPassword(e,function(t,s){t?n.reject(t):n.resolve(s),r&&r(s,e)}),n.promise}function o(e,r){var s=t.defer();return l.createUser(e,function(r,t){r?s.reject(r):(s.resolve(t),a(e,function(r){n(r,e)}))}),s.promise}function i(e){var r=l.child("users").child(e).child("events");return r}function u(e){l.onAuth(e)}function c(){l.unauth()}var l=new Firebase(r),g={saveNewUser:n,getUserAuth:s,createUser:o,loginWithPwd:a,setEventRef:i,setOnAuth:u,logOutUser:c};return g}angular.module("app.fbAuth").factory("authService",e),e.$inject=["$firebase","FBURL","$q"]}();