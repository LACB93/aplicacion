angular.module('MainApp', [])


function mainController($scope, $http) {
	$scope.newPersona = {};
	$scope.personas = {};
	$scope.selected = false;


	$http.get('/api/persona').success(function(data) {
		$scope.personas = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});


	$scope.registrarPersona = function() {
		$http.post('/api/persona', $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {};
				$scope.personas = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


	$scope.modificarPersona = function(newPersona) {
		$http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {};
				$scope.personas = data;
				$scope.selected = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


	$scope.borrarPersona = function(newPersona) {
		$http.delete('/api/persona/' + $scope.newPersona._id)
		.success(function(data) {
			$scope.newPersona = {};
			$scope.personas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};


	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};
}