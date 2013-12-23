var apiculateDox = angular.module('apiculateDox',[]);

//apiculateDox.directive('endpoint', ['$http', function($http) { }])

//apiculateDox.factory('myService', function() {});


apiculateDox.controller('MainCtrl', ['$scope','$location', function($scope, $location) {

	var magleaf, magOffset;
	
	function calcLogoOffset(){
		var logoleaf = $(".logo > .fa-leaf");
		magleaf = $(".magnify");
		magOffset = {top: logoleaf.offset().top - magleaf.height() / 6 , left: logoleaf.offset().left - magleaf.width() /6 };
	}
	calcLogoOffset();
	
	$(window).resize(calcLogoOffset);
	
	
	$scope.overLeaf = function(event){
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
	}
	
}]);