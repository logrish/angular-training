angular.module('CustomApp', ['CustomApp.Filters','CustomApp.Directives'])

.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.name = 'Rogen';
}]);

angular.module('CustomApp.Directives',[])
.directive('printThis', [function(){
	return{
		restrict:'AEC',
		scope:{
			text:'@text'
		},
		template:'<input type="text" ng-model="text"> {{text}}',
		link: function(s,e,a){}
	};
}])


angular.module('CustomApp.Filters', [])

.filter('xfilter',function(){
	return function(val){
		if(typeof val==='number'){
			return parseInt(val)+20;
		}else{
			return val+10;
		}
	}
})
.filter('checkmark',function(){
	var filterFunction = function(input){
		return input ?'\u2713':'\u2718';
	};
	return filterFunction;
});