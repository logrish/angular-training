angular.module('EditApp',[])
angular.controller('NameCtrl', ['$scope', function ($scope) {
	
}])
.controller('AppController',function($scope){

	$scope.myName = 'Rogen';

	$scope.edit = function(){
		$scope.isEditMode = true;
	}
	function save(){
		$scope.isEditMode = false;

	}
	$scope.save = save;
})