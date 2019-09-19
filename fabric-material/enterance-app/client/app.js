// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	
	//queryAllenterance 라는 ng-click에 function() 이하를 넣는다
	$scope.queryAllEnterance = function(){

		appFactory.queryAllEnterance(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_enterance = array;
		});
	}

	$scope.queryEnterance = function(){

		var Holder = $scope.enterance_Holder; //html 파일에 enterance_Holder이라는 ng-model이 존재한다

		appFactory.queryenterance(Holder, function(data){
			$scope.query_enterance = data;

			if ($scope.query_enterance == "Could not locate enterance"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordenterance = function(){

		appFactory.recordenterance($scope.enterance, function(data){
			$scope.create_enterance = data;
			$("#success_create").show();
		});
	}

	$scope.changeHolder = function(){

		appFactory.changeHolder($scope.holder, function(data){
			$scope.change_holder = data;
			if ($scope.change_holder == "Error: no enterance catch found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllenterance = function(callback){

    	$http.get('/get_all_enterance/').success(function(output){
			callback(output)
		});
	}

	factory.queryenterance = function(id, callback){
		$http.get('/get_enterance/'+id)
		.then(function success(output){
			console.log(output);
			callback(output)
		}, function error(err){
			console.error(err);
			callback(err);
		});
	}

	factory.recordenterance = function(data, callback){

		data.location = data.longitude + ", "+ data.latitude;

		var enterance = data.id + "-" + data.location + "-" + data.timestamp + "-" + data.holder + "-" + data.vessel;

    	$http.get('/add_enterance/'+enterance).success(function(output){
			callback(output)
		});
	}

	factory.changeHolder = function(data, callback){

		var holder = data.id + "-" + data.name;

    	$http.get('/change_holder/'+holder).success(function(output){
			callback(output)
		});
	}

	return factory;
});


