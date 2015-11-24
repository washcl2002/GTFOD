app = angular.module("myMod", []);

app.controller("myCtrl", function($scope, $http){
	$http.get("/api").success(function(data){
		console.log(data);
		$scope.data = data;
	});
});