angular.module('ASModule', [])

.controller('App3Ctrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.open = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
})

.controller('App2Ctrl', function($scope, $ionicPopup) {

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });

        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
    $scope.showConfirmation = function() {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Consume Ice Cream',
            template: 'Are you sure you want to eat this ice cream?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    }
    $scope.showPrompt = function() {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    }
})

.controller('AppCtrl', function($scope, $ionicActionSheet) { // Make Sure to Add the $ionicActionSheet as Dependency to the Controller

    // Show the action sheet
    $scope.open = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<b>Share</b> This' },
                { text: 'Move' }
            ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
                console.log("user cancelled");
            },
            buttonClicked: function(index) {
                console.log("Clicked", index);
                return true;
            },
            destructiveButtonClicked: function(index) {
                console.log("destructiveButtonClicked", index);
                return true;

            }
        });
    }

})
