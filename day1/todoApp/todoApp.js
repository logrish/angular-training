angular.module('TodoApp',[])

.controller('todoAppController',function($scope,TodoFactory){

	var uid= 0;
	$scope.todos = TodoFactory.get();

	$scope.addTodo = function($event){
		if ($event.charCode === 13) {
			var todo ={
				id : uid++,
				text : $scope.todoText,
				isCompleted : false,
				EditItem : false
			}
			$scope.todos.push(todo);
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
	}

	$scope.deleteTodo = function($index){
		console.log("done");

		$scope.todos.splice($index,1);
		console.log($scope.todos);
	}
	$scope.cancelTodoEdit = function(todo){
		todo.text = todo.tmpText;
		todo.EditItem = false;
	}
	
})
.controller ('headerController', function($scope,TodoFactory){
	$scope.todos = TodoFactory.get();
})

.factory('TodoFactory',function(){
	var todos = [];
	return {
		get :function(){
			return todos;
		}
	};
})