angular.module('app.routes', [])



.config(function($stateProvider, $urlRouterProvider) {



  // Ionic uses AngularUI Router which uses the concept of states

  // Learn more here: https://github.com/angular-ui/ui-router

  // Set up the various states which the app can be in.

  // Each state's controller can be found in controllers.js

  $stateProvider

    

  



      .state('menu.slider', {

    url: '/slider',

    views: {

      'side-menu21': {

        templateUrl: 'templates/slider.html',

        controller: 'sliderCtrl'

      }

    }

  })
  
  .state('menu.search', {

    url: '/search/:id',

    views: {

      'side-menu21': {

        templateUrl: 'templates/search.html',

        controller: 'searchCtrl'

      }

    }

  })



  .state('menu.createProfile', {

    url: '/signup',

    views: {

      'side-menu21': {

        templateUrl: 'templates/createProfile.html',

        controller: 'createProfileCtrl'

      }

    }

  })
  
  .state('menu.privicy_p', {

    url: '/privicy_p',

    views: {

      'side-menu21': {

        templateUrl: 'templates/privicy_p.html',

        controller: 'privicy_pCtrl'

      }

    }

  })



  .state('menu', {
    url: '/side-menu21',

    templateUrl: 'templates/menu.html',

    controller: 'menuCtrl'

  })



  .state('menu.nearestRestaurants', {
    cache:false,
    url: '/nearestRestaurants/:id',

    views: {

      'side-menu21': {

        templateUrl: 'templates/nearestRestaurants.html',

        controller: 'nearestRestaurantsCtrl'

      }

    }

  })

  

 .state('menu.history', {

    url: '/history',

    views: {

      'side-menu21': {

        templateUrl: 'templates/history.html',

        controller: 'historyCtrl'

      }

    }

  })

  


  .state('menu.profile', {
cache:false,
    url: '/profile',

    views: {

      'side-menu21': {

        templateUrl: 'templates/profile.html',

        controller: 'profileCtrl'

      }

    }

  })

 

.state('menu.menuFood', {

    url: '/menuFood/:id/:name/:desc/:image',

    views: {

      'side-menu21': {

        templateUrl: 'templates/menuFood.html',

        controller: 'menuFoodCtrl'

      }

    }

  })


  
  
  .state('menu.cart2', {
cache:false,
    url: '/cart2/:id/:name/:price/:image',

    views: {

      'side-menu21': {

        templateUrl: 'templates/cart2.html',

        controller: 'cart2Ctrl'

      }

    }

  })
  
  
.state('menu.payment', {

    url: '/payment',

    views: {

      'side-menu21': {

        templateUrl: 'templates/payment.html',

        controller: 'paymentCtrl'

      }

    }

  })

.state('menu.confirmation', {
cache:false,
    url: '/confirmation',

    views: {

      'side-menu21': {

        templateUrl: 'templates/confirmation.html',

        controller: 'confirmationCtrl'

      }

    }

  })


/*------------------*/


  .state('menu.editinfo', {

    url: '/editinfo',

    views: {

      'side-menu21': {

        templateUrl: 'templates/editinfo.html',

        controller: 'editinfoCtrl'

      }

    }

  })



  
  .state('menu.changepassword', {

    url: '/changepassword',

    views: {

      'side-menu21': {

        templateUrl: 'templates/changepassword.html',

        controller: 'changepasswordCtrl'

      }

    }

  })

  

   .state('menu.subscription', {

    url: '/subscription',

    views: {

      'side-menu21': {

        templateUrl: 'templates/subscription.html',

        controller: 'subscriptionCtrl'

      }

    }

  })



   .state('menu.classic', {

    url: '/classic/:id/:plan/:desc',

    views: {

      'side-menu21': {

        templateUrl: 'templates/classic.html',

        controller: 'classicCtrl'

      }

    }

  })

 


   
.state('menu.editaddr', {
    cache:false,
    url: '/editaddr/:id',

    views: {

      'side-menu21': {

        templateUrl: 'templates/editaddr.html',

        controller: 'editaddrCtrl'

      }

    }

  })

        .state('menu.customize', {
cache:false,
    url: '/customize/:pid/:name/:day/:type',

    views: {

      'side-menu21': {

        templateUrl: 'templates/customize.html',

        controller: 'customizeCtrl'

      }

    }

  })
  
        .state('menu.checkout3', {
    cache:false,
    url: '/checkout3',

    views: {

      'side-menu21': {

        templateUrl: 'templates/checkout3.html',

        controller: 'checkout3Ctrl'

      }

    }

  })
  
  
          .state('menu.newaddresses2', {
    //cache:false,
    url: '/newaddresses2',

    views: {

      'side-menu21': {

        templateUrl: 'templates/newaddresses2.html',

        controller: 'newaddresses2Ctrl'

      }

    }

  })
  
  
            .state('menu.changeaddress2', {
    cache:false,
    url: '/changeaddress2',

    views: {

      'side-menu21': {

        templateUrl: 'templates/changeaddress2.html',

        controller: 'changeaddress2Ctrl'

      }

    }

  })
  
  

.state('menu.signin', {

    url: '/signin',

    views: {

      'side-menu21': {

        templateUrl: 'templates/signin.html',

        controller: 'SignInCtrl'

      }

    }

  })
.state('menu.forgetpassword', {

    url: '/forgetpassword',

    views: {

      'side-menu21': {

        templateUrl: 'templates/forgetpassword.html',

        controller: 'forgetPasswordCtrl'

      }

    }

  })


.state('menu.addaddr', {

    url: '/addaddr',

    views: {

      'side-menu21': {

        templateUrl: 'templates/addaddr.html',

        controller: 'addaddrCtrl'

      }

    }

  })


.state('menu.about', {

    url: '/about',

    views: {

      'side-menu21': {

        templateUrl: 'templates/about.html',

        controller: 'aboutCtrl'

      }

    }

  })
  
.state('menu.invitefriends', {

    url: '/invitefriends',

    views: {

      'side-menu21': {

        templateUrl: 'templates/invitefriends.html',

        controller: 'invitefriendsCtrl'

      }

    }

  })
.state('menu.aboutus', {

    url: '/aboutus',

    views: {

      'side-menu21': {

        templateUrl: 'templates/aboutus.html',

        controller: 'aboutusCtrl'

      }

    }

  })
.state('menu.contactus', {

    url: '/contactus',

    views: {

      'side-menu21': {

        templateUrl: 'templates/contactus.html',

        controller: 'contactusCtrl'

      }

    }

  })
.state('menu.faq', {

    url: '/faq',

    views: {

      'side-menu21': {

        templateUrl: 'templates/faq.html',

        controller: 'faqCtrl'

      }

    }

  })
.state('menu.dp', {

    url: '/dp',

    views: {

      'side-menu21': {

        templateUrl: 'templates/dp.html',

        controller: 'dpCtrl'

      }

    }

  })
.state('menu.pp', {

    url: '/pp',

    views: {

      'side-menu21': {

        templateUrl: 'templates/pp.html',

        controller: 'ppCtrl'

      }

    }

  })
.state('menu.weekly', {
cache:false,
    url: '/weekly',

    views: {

      'side-menu21': {

        templateUrl: 'templates/weekly.html',

        controller: 'weeklyCtrl'

      }

    }

  })

.state('menu.oneday', {

    url: '/oneday',

    views: {

      'side-menu21': {

        templateUrl: 'templates/oneday.html',

        controller: 'onedayCtrl'

      }

    }

  })

.state('menu.rank', {

    url: '/rank',

    views: {

      'side-menu21': {

        templateUrl: 'templates/rank.html',

        controller: 'rankCtrl'

      }

    }

  })
.state('menu.calculator', {

    url: '/calculator',

    views: {

      'side-menu21': {

        templateUrl: 'templates/calculator.html',

        controller: 'calculatorCtrl'

      }

    }

  })
$urlRouterProvider.otherwise('/side-menu21/slider')
});