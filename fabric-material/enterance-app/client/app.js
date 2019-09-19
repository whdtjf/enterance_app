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

		var Timestamp = $scope.enterance_Timestamp; //html 파일에 enterance_Holder이라는 ng-model이 존재한다

		appFactory.queryEnterance(Timestamp, function(data){
			$scope.query_enterance = data;

			if ($scope.query_enterance == "Could not locate enterance"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.recordBarcode = function(){

		appFactory.recordBarcode($scope.enterance, function(data){
			$scope.create_barcode = data;
			$("#success_create").show();
		});
	}

	$scope.UpdateEnterance = function(){

		appFactory.UpdateEnterance($scope.timestamp, function(data){
			$scope.update_timestamp = data;
			if ($scope.update_timestamp == "Error: no enterance catch found"){
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

    factory.queryAllEnterance = function(callback){

    	$http.get('/get_all_enterance/').success(function(output){
			callback(output)
		});
	}

	factory.queryEnterance = function(id, callback){
		$http.get('/get_enterance/'+id)
		.then(function success(output){
			console.log(output);
			callback(output)
		}, function error(err){
			console.error(err);
			callback(err);
		});
	}

	factory.recordBarcode = function(data, callback){

		var enterance = data.id + "-" + data.name + "-" + data.timestamp;

    	$http.get('/add_barcode/'+enterance).success(function(output){
			callback(output)
		});
	}

	factory.UpdateEnterance = function(data, callback){

		var updated_timestamp = data.id + "-" + data.timestamp;

    	$http.get('/update_enterance/'+updated_timestamp).success(function(output){
			callback(output)
		});
	}

	return factory;
});


