(function() {
	'use strict';

var app = angular.module('urlrewrite-options', []);

app.controller('OptionsCtrl', function($scope) {
	var mappingKey = 'nl.sjmulder.urlrewrite.mappings';
	var additionsKey = 'nl.sjmulder.urlrewrite.additions';

	function last (array) {
	  return array[array.length - 1]
  }
	$scope.lastMapping = function() {
		return last($scope.mappings)
	}
	$scope.lastAddition = function() {
		return last($scope.additions)
	}

	$scope.removeAt = function(index) {
		if (index >= 0 && index < $scope.mappings.length - 1) {
			$scope.mappings.splice(index, 1);
		}
	}

	$scope.removeAdditionAt = function(index) {
		if (index >= 0 && index < $scope.additions.length - 1) {
			$scope.additions.splice(index, 1);
		}
	}

	$scope.$watch('mappings', function(value) {
		if (value) {
			localStorage[mappingKey] = angular.toJson(value.slice(0, value.length - 1));
		}
	}, true);

	$scope.$watch('additions', function(value) {
		if (value) {
			localStorage[additionsKey] = angular.toJson(value.slice(0, value.length - 1));
		}
	}, true);

	$scope.$watch('lastMapping()', function(value) {
		if (value && (value.sourceUrl || value.destinationUrl)) {
			$scope.mappings.push({ sourceUrl: '', destinationUrl: '' });
		}
	}, true);
  $scope.$watch('lastAddition()', function(value) {
		if (value && (value.sourceUrl || value.addition)) {
			$scope.additions.push({ sourceUrl: '', addition: '' });
		}
	}, true);

	$scope.mappings = JSON.parse(localStorage[mappingKey] || '[]');
	$scope.additions = JSON.parse(localStorage[additionsKey] || '[]');
	$scope.mappings.push({ sourceUrl: '', destinationUrl: '' });
	$scope.additions.push({ sourceUrl: '', addition: '' });
});

})();
