// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','google.places','ngCordova'])

.run(function($ionicPlatform,$rootScope,$ionicPopup,$ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    $rootScope.cntype={headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
$rootScope.$on('$ionicView.enter', function(){
  $ionicSideMenuDelegate.canDragContent(true);
});
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider) {
$ionicConfigProvider.views.swipeBackEnabled(false);
})
.constant('URL','http://plait.co.za/plait/')
.constant('BASE','http://plait.co.za/plait/')




