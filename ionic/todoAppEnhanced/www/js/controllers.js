angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})


.value('RESTURL', 'http://127.0.0.1:3000/todos')

.controller('TodosCtrl', function($scope, TodoRESTFactory, $ionicModal) {

    $scope.listCanSwipe = true;
    $scope.data = {};
    TodoRESTFactory
        .get()
        .then(function(response) {
            $scope.todos = response.data;
            console.log($scope.todos);
        })

    $ionicModal.fromTemplateUrl('templates/newtodo.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.toggleRemove = function() {
        $scope.showDeleteOptions = true;
    }

    $scope.toggleNewTodoModal = function() {
        $scope.data.todoText = '';
        $scope.modal.show();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    }

    $scope.createTodo = function(todo) {
        var todo = {
            id: (Math.floor(Math.random() * 5498746548)),
            text: $scope.data.todoText
        };

        TodoRESTFactory
            .post(todo)
            .then(function(response) {
                if (response.status === 201) {
                    $scope.todos.push(response.data);
                    $scope.closeModal();
                }
            })
    }
    $scope.edit = function(todo) {
        $scope.editingTodoId = todo.id;
        $scope.data.todoText = todo.text;
        $scope.modal.show();
    }


    $scope.saveTodo = function(todo) {
        var updatedTodo = {
            id: $scope.editingTodoId,
            text: $scope.data.todoText
        }
        TodoRESTFactory
            .put(updatedTodo.id, updatedTodo)
            .then(function(response) {
                if (response.status === 200) {
                    for (var i = $scope.todos.length - 1; i >= 0; i--) {
                        if ($scope.todos[i].id === updatedTodo.id) {
                            $scope.todos[i].text = updatedTodo.text;
                        }
                    }
                    $scope.closeModal();
                }
            })
    }

    $scope.removeTodo = function(todo, $index) {
        TodoRESTFactory.delete(todo.id).then(function(response) {
            if (response.status === 200) {
                $scope.todos.splice($index, 1);
                $scope.showDeleteOptions = false;
            }

        })
    }

})

.factory('TodoRESTFactory', function($http, RESTURL) {
    return {
        get: function() {
            return $http.get(RESTURL);
        },
        getOne: function(id) {
            return $http.get(RESTURL + '/' + id);
        },
        post: function(todo) {
            return $http.post(RESTURL, todo);
        },
        put: function(id, todo) {
            return $http.put(RESTURL + '/' + id, todo);

        },
        delete: function(id) {
            return $http.delete(RESTURL + '/' + id);

        }
    }
})
