angular.module('NGBSApp',['ngRoute'])

.config(function($routeProvider){
    $routeProvider
    .when('/home',{
    	templateUrl: 'Templates/home.html'
    })
    .when('/about',{
    	templateUrl: 'Templates/about.html'
    })
    .when('/contact',{
    	templateUrl: 'Templates/contactus.html'
    })
    .when('/movies',{
    	templateUrl: 'Templates/movies.html',
    	controller: 'moviesCtrl'
    })   
     .when('/movie/:movieId',{
      templateUrl: 'Templates/movie.html',
      controller: 'movieCtrl'
    })
    .otherwise({
    	redirectTo: '/home'
    });
})

.run(function($rootScope){
	console.log('run');
	$rootScope.headerUrl='Templates/header.html';
})

.controller('headerCtrl',function($scope, $location){
	$scope.isActive=function(url) {
		return $location.path() === url;
	}
})

.controller('moviesCtrl',function($scope, moviesFactory){
	moviesFactory
	.get()
	.then(function(response){
        $scope.movies=response.data;
	})
	.catch(function(error){
		console.log(error);
	})


})

.controller('movieCtrl',function($scope, moviesFactory,$routeParams){
  moviesFactory
  .get()
  .then(function(response){
        $scope.currentMovie=response.data[$routeParams.movieId];
  })
  .catch(function(error){
    console.log(error);
  })


})

.factory('moviesFactory',function($http){
   return {
   	 get: function(){
   	 	return $http.get('movies.json');
   	 }
   }
})
