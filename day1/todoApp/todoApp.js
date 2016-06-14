angular.module('TodoApp',[])

.controller('todoAppController',function($scope,$rootScope,TodoFactory,TodoLSFactory){

	var uid= 0;
	// $scope.todos = TodoFactory.get();

	$scope.$on('loadTodos',function(){
		$scope.todos = TodoLSFactory.read();
		$rootScope.$broadcast('updateOtherScopeTodos');
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
			TodoLSFactory.create(todo);
			$scope.$broadcast('loadTodos');
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
		TodoLSFactory.update(todo);
	}

	$scope.deleteTodo = function($index,todo){
		console.log("done");

		// $scope.todos.splice($index,1);
		TodoLSFactory.delete(todo);
		console.log($scope.todos);
					$scope.$broadcast('loadTodos');

	}
	$scope.cancelTodoEdit = function(todo){
		todo.text = todo.tmpText;
		todo.EditItem = false;
	}
	
})
.controller ('headerController', function($scope,$rootScope,TodoFactory,TodoLSFactory){
	// $scope.todos = TodoFactory.get();
	$rootScope.$on('updateOtherScopeTodos',function(){
		$scope.todos = TodoLSFactory.read();
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