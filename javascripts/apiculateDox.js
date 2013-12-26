var apiculateDox = angular.module('apiculateDox',[]);

//apiculateDox.directive('endpoint', ['$http', function($http) { }])

//apiculateDox.factory('myService', function() {});


apiculateDox.controller('MainCtrl', ['$scope','$location', '$timeout', function($scope, $location, $timeout) {

	var magleaf = $(".magnify"), magOffset, init;
	
	function calcLogoOffset(){
		var logoleaf = $(".logo > .fa-leaf");
		magOffset = {top: logoleaf.offset().top - magleaf.height() / 6 , left: logoleaf.offset().left - magleaf.width() /6 };
	}
	
	$(window).resize(calcLogoOffset);
	
	
	$scope.overLeaf = function(event){
		if (!init) //because we hide the glass initially now, we have to calc & overleaf twice to get the right values
			calcLogoOffset() //TODO make this better, this is just a bandaid for the real problem
			
		if (event.pageY > 150){
			$(".fa.fa-search").addClass('initial');
			return;
		}
		var search = $(".fa.fa-search");
		search.removeClass('initial');
		var hOffset = search.height()/2;
		var wOffset = search.width()/2;
		search.css({top: event.pageY - hOffset + "px", left: event.pageX - wOffset + "px"});
		//search.offset().top  + tempTop = magleaf.offset().top , then apply magnification
		//search.offset().left + tempLeft = magleaf.offset().left, then apply magnification
		magleaf.css({top: (magOffset.top - search.offset().top)*3 + "px", left: (magOffset.left - search.offset().left)*3 + "px"});
		if (!init){
			calcLogoOffset();
			init = true;
			$scope.overLeaf(event);
		}			
	}
	
	$scope.hoverIndex = 1;
	$scope.hover = function(i){
		$timeout.cancel($scope.autohoverPromise);
		$scope.hoverIndex = i;
	}
	
	$scope.autohover = function(){
		$scope.autohoverPromise = $timeout(function(){
			$scope.hoverIndex++;
			if ($scope.hoverIndex > 4)
				$scope.hoverIndex = 1;
			$scope.autohover();
		}, 5000);
	};
	
	$scope.autohover();
	
}]);