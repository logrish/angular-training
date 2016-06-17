angular.module('starter.controller', [])

.controller('AuthCtrl', function ($scope,$state) {
    $scope.user={
        email:'',
        password:''
    }
    $scope.AuthUser = function(){
        var user = $scope.user;
        if (user.email==='a@a.com'&&user.password ==='aaa') {
            $scope.invalidLogin = false;
            $state.go('rating');
        }else{
            $scope.invalidLogin = true;
        }
    }
    
})

.controller('RatingsCtrl', function($scope) {
    $scope.ratingsArr = [{
        value: 1,
        icon: 'ion-ios-star-outline'
    }, {
        value: 2,
        icon: 'ion-ios-star-outline'
    }, {
        value: 3,
        icon: 'ion-ios-star-outline'
    }, {
        value: 4,
        icon: 'ion-ios-star-outline'
    }, {
        value: 5,
        icon: 'ion-ios-star-outline'
    }];

    $scope.setRating = function(val) {
        var rtgs = $scope.ratingsArr;
        for (var i = rtgs.length - 1; i >= 0; i--) {
            if (i < val) {
                rtgs[i].icon = 'ion-ios-star'
            } else {
                rtgs[i].icon = 'ion-ios-star-outline';
            }
        }
    }
})