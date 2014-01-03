var apiculate = angular.module('apiculate',[]);

apiculate.directive('endpoint', ['$http', function($http) {
    return {
        scope:{            
            endpoint: "=endpoint"        
        },
        //template:"<div><h3>{{endpoint.url}}</h3></div>",
        link: function ($scope, $element, $attrs){
            
            $scope.call = function(){
				$scope.endpoint.calling = true;
				
				//default to localhost
				if ($scope.endpoint.host == null)
					$scope.endpoint.host = "local";
					
				if ($scope.endpoint.host == "local"){
					$scope.endpoint.callUrl = $scope.endpoint.viewUrl;
				} else {
					$scope.endpoint.callUrl = window.apiculateConfig.hosts[$scope.endpoint.host]+$scope.endpoint.viewUrl;
				}
				
				var hasParams = false;
				angular.forEach($scope.endpoint.params, function(param){
					if (param.example != null){
						if (param.example != param.apiDefault){
							if (!hasParams){
								$scope.endpoint.callUrl += "?";
								hasParams = true;
							} else {
								$scope.endpoint.callUrl += "&";
							}
							$scope.endpoint.callUrl += param.key + "=" + param.example;
						}
					} else if (param.optional){
						//error error
						$scope.endpoint.callUrl = "";
					}
				});
				
				$scope.endpoint.rawStatus = null;
				if ($scope.endpoint.raw){
					$scope.getRaw();
				}
            };
        },
		controller: ['$scope', function($scope){
            $scope.paramFilter = function(param){
				if (param.optional){
					return param.example != param.apiDefault;
				} else if (param.apiDefault != null && param.example == null){
					return param.apiDefault;
				} else {
					return param.example;
				}
            };
			$scope.refreshUrl = function(){
				var urlPaths = $scope.endpoint.paths; 
				var newUrl = $scope.endpoint.url;
				
				if (urlPaths){
					angular.forEach(urlPaths, function(value, key){
						var v = value.example;
						if (v){
							if (newUrl.indexOf("<<"+key+">>") != -1){
								newUrl = newUrl.replace("<<"+key+">>", v);
							} else if (newUrl.indexOf(":"+key) != -1){
								newUrl = newUrl.replace(":"+key, v);
							}
						}
					});
				}
				
				$scope.endpoint.viewUrl = newUrl;
			};
			
			
			$scope.getRaw = function(){
				$http.defaults.useXDomain = true;
				$http({method: "GET", url: $scope.endpoint.callUrl}).success(function(data, status){
					$scope.endpoint.rawResponse = data;
					$scope.endpoint.rawStatus = status;
					$scope.endpoint.rawError = false;
				}).error(function(data, status){
					$scope.endpoint.rawResponse = "";
					$scope.endpoint.rawError = data;
					$scope.endpoint.rawStatus = status;
				});
				$http.defaults.useXDomain = false;
			};
			
			$scope.$watch('endpoint.raw', function(newValue){
				if (newValue)
					$scope.getRaw();
			});
		}],
    }

}]);
//apiculate.factory('myService', function() {});


apiculate.controller('MainCtrl', ['$scope','$location', function($scope, $location) {
	
	
	if (!window.apiculateConfig){
		window.apiculateConfig = {};
	}
	
	if (window.apiculateConfig.hosts){
	} else {
		window.apiculateConfig.hosts = {'local': 'localhost', 'default': 'localhost:1234'};
	}
	if (window.apiculateConfig.endpoints){
			$scope.endpoints = window.apiculateConfig.endpoints;
	} else {
		if ($location.absUrl().indexOf("index.inline.html") != -1){
			$scope.endpoints = [	
				{
					url: "/index.inline.html",
					method: 'GET',
					description: "Fetches the apiculate inline file, which has all you need to get started with apiculate.",
					host: "local",
				},		
			];
		} else {
			$scope.endpoints = [			
				// {
					// url: "/api/endpoint",
					// params: [
						// {key:"search", example:"foo", type:"String"},
						// {key:"take", apiDefault:5, type:"Number"},
					// ],
					// auth: true,
					// token: false,
				// },
				{
					url: "/index.html",
					method: 'GET',
					description: "Fetches the HTML view of apiculate",
					host: "local",
				},
				{
					url: "/js/apiculate.js",
					method: 'GET',
					description: "Fetches the JS controller for apiculate",
					host: "local",
				},
				{
					url: "/css/apiculate.css",
					method: 'GET',
					description: "Fetches the CSS of apiculate's view",
					host: "local",
				}
			];
		}
	}
		
	//we want our endpoints to be sorted so that we can group them by route
	$scope.endpoints.sort(function(a, b){
		return a.url > b.url;
	});
	
	//we hide the coefficient inside this object so our child lookup works correctly. I'ts an angular thing
	$scope.grouping = {
		coef: -1
	};
	
	angular.forEach($scope.endpoints, function(end){
		end.depth = end.url.split("/").length -3;
		end.viewUrl = end.url;
		end.searchField = (end.url + " " + end.method + " " + end.description).toLowerCase();
		end.pathParams = [];
		angular.forEach(end.paths, function(pathObj, pathKey){
			pathObj.key = pathKey;
			end.pathParams.push(pathObj);
		});
		angular.forEach(end.params, function(param){
			if (param.apiDefault != null)
				param.hasDefault = true;
				if (!param.example)
					param.example = param.apiDefault;
		});
		end.getOffset = function(){
			return ((end.depth * 25) * ($scope.grouping.coef + 1)) + 'px';
		};
	});
	
	$scope.filter = function(endpoint){
		if ($scope.tokenFilter != undefined && endpoint.token !== $scope.tokenFilter)
			return false;
		if ($scope.authFilter != undefined && endpoint.auth !== $scope.authFilter)
			return false;
			
		if ($scope.query){
			if ($scope.methodFilter != 'all'){
				if (endpoint.method.toLowerCase() != $scope.methodFilter)
					return false;
			}
			var search = $scope.query.toLowerCase();
			return endpoint.searchField.toLowerCase().indexOf(search) != -1;
		} else if ($scope.methodFilter != 'all'){
			return endpoint.method.toLowerCase() == $scope.methodFilter;
		} else {
			return true;
		}
	};
	
	$scope.checkParents = function(){
		angular.forEach($scope.endpoints, function(end){
			
		});
	};
	
	$scope.hideAll = function(hide){
		angular.forEach($scope.endpoints, function(e){
			e.hide = hide;
		});
	};
	
	$scope.methodFilter = 'all';
}]);