(function() {
    "use strict";
    var meetupEventApp = angular.module('meetupEventApp', ['firebase']);

    meetupEventApp.controller('MeetupEventCtrl', ['$scope', '$firebaseArray',
        function($scope, $firebaseArray) {
            var ref = new Firebase("https://vivid-torch-762.firebaseio.com/");
            $scope.eventsArray = $firebaseArray(ref);
            $scope.master = {};
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
                            $('.login').modal('hide');
                        }
                    });
                }
            };
            /*

                        ref.createUser({
                            email: $scope.userEmail,
                            password: $scope.userPass
                        }, function(error, userData) {
                            if (error) {
                                console.log("Error creating user:", error);
                            } else {
                                console.log("Successfully created user account with uid:", userData.uid);
                            }
                        });
            			*/
        }
    ]);
})();
