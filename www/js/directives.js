angular.module('app.directives', [])

.directive('blankDirective', [function(){

}]);
//.directive("scroll", function ($window) {
//	alert("0");
//    return function(scope, element, attrs) {
//      alert("1");
//        angular.element($window).bind("scroll", function() {
//            if (this.pageYOffset >= 100) {
//                 scope.boolChangeClass = true;
//				  alert("2");
//                 console.log('Scrolled below header.');
//             } else {
//                 scope.boolChangeClass = false;
//				  alert("3");
//                 console.log('Header is in view.');
//             }
//            scope.$apply();
//        });
//    };
//});
