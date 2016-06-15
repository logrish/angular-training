angular.module('TodoApp',[])

.controller('todoAppController',function($scope,$rootScope,TodoFactory,TodoLSFactory,TodoRESTFactory){

	var uid= 0;
	// $scope.todos = TodoFactory.get();
		// $scope.todos = TodoLSFactory.read();

		$scope.$on('loadTodos',function($event,todos){
			if (todos) {		
				$rootScope.$broadcast('updateOtherScopeTodos',todos);
			}else{
				TodoRESTFactory.get()
				.then(function(response){
					$scope.todos =response.data;
					$rootScope.$broadcast('updateOtherScopeTodos',response.data);

				})
			}
		});
		$scope.$broadcast('loadTodos');

		$scope.addTodo = function($event){
			if ($event.charCode === 13) {
				var todo ={
					id : TodoLSFactory.genUID(),
					text : $scope.todoText,
					isCompleted : false,
					EditItem : false
				}
			// $scope.todos.push(todo);
			// TodoLSFactory.create(todo);
			TodoRESTFactory.post(todo)
			.then( function(response){
				if (response.status==201) {
					$scope.todos.push(response.data);
					$scope.$broadcast('loadTodos',$scope.todos);
				}
			})
			$scope.todoText = "";
			console.log($scope.todos);
		}

	}
	$scope.editTODO = function(todo){
		todo.tmpText = todo.text;
		todo.EditItem = true;
	}
	$scope.saveTODO = function(todo){
		todo.EditItem = false;
		delete todo.isEditMode;
		delete todo.$$hashKey;
		delete todo.tmpText;
		// TodoLSFactory.update(todo);

		TodoRESTFactory.put(todo.id,todo)
		.then( function(response){
			$scope.$broadcast('loadTodos',$scope.todos);
		})
	}

	$scope.deleteTodo = function($index,todo){
		console.log("done");

		// $scope.todos.splice($index,1);
		// TodoLSFactory.delete(todo);
		TodoRESTFactory.delete(todo.id)
		.then( function(response){

			if (response.status==200) {
				console.log($scope.todos);
				$scope.todos.splice($index,1);

				$scope.$broadcast('loadTodos',$scope.todos);
			}})
		}
		$scope.cancelTodoEdit = function(todo){
			todo.text = todo.tmpText;
			todo.EditItem = false;
		}

	})
		.controller ('headerController', function($scope,$rootScope,TodoFactory,TodoLSFactory){
	// $scope.todos = TodoFactory.get();
	$rootScope.$on('updateOtherScopeTodos',function($event,todos){
		$scope.todos = todos;
	});
})

		.factory('TodoFactory',function(){
			var todos = [];
			return {
				get :function(){
					return todos;
				}
			};
		})

		.factory('TodoLSFactory',function(LSFactory){
			return{
				read:function(){
					var todos = [];
					var lsObj = LSFactory.getAll();
					var keys = Object.keys(lsObj);
					for (var i = keys.length - 1; i >= 0; i--) {
						if(keys[i].indexOf('todo-')===0){
							todos.push(JSON.parse(lsObj[keys[i]]));
						}
					}			
					return todos;
				},
				create: function(todo){
					return LSFactory.create("todo-"+todo.id,todo);
				},
				update: function(todo){
					return LSFactory.create("todo-"+todo.id,todo);
				},
				delete: function(todo){
					return LSFactory.delete("todo-"+todo.id);
				},
				genUID: function(){
					return Math.floor(Math.random()*100000);
				}

			};
		})

		.factory('LSFactory', function($window){
			return{
				getAll : function(){
					return $window.localStorage;
				},
				get : function(key){
					return JSON.parse($window.localStorage.getItem(key));
				},
				create : function(key, value){
					return $window.localStorage.setItem(key, JSON.stringify(value));
				},

				update : function(key, value){
					return $window.localStorage.setItem(key, JSON.stringify(value));
				},
				delete: function(key){
					return $window.localStorage.removeItem(key);
				}
			};
		})
		.value('RESTURL','http://127.0.0.1:3000/todos')

		.factory('TodoRESTFactory',function($http,RESTURL){
			return{
				get: function(){
					return $http.get(RESTURL);
				},
				getOne : function(id){
					return $http.get(RESTURL+'/'+id);
				},
				post: function(todo){
					return $http.post(RESTURL,todo);
				},
				put: function(id,todo){
					return $http.put(RESTURL+'/'+id,todo);

				},
				delete: function(id){
					return $http.delete(RESTURL+'/'+id);

				}
			}
		})