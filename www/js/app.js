// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services'])


.run(function($cordovaPush,$cordovaDevice,$ionicPlatform,$state,$rootScope,$cordovaNetwork,$ionicSideMenuDelegate,$ionicLoading,$http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  /*var info ={
    usn:'1ds12cs067',
    password:'kalro',
    fine:'0'
  };
    window.localStorage['id'] = JSON.stringify(info);
    console.log(JSON.parse(window.localStorage['id']).usn);
    document.getElementById('menu-usn').innerHTML=JSON.parse(window.localStorage['id']).usn;*/
    /*if(window.localStorage['id'])
       $location.path('/tab/dash');
     else
        $location.path('/tab/home');*/
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard ) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    var androidConfig = {
        "senderID": "603788932936",
    };
    if(window.plugins.pushNotification)
    {
    /*$cordovaPush.register(androidConfig).then(function(result) {
           
            
        }, function(err) {
            $ionicLoading.show({
          template: err,
          duration:7000
        });
            // Error
        })*/
    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
           /* $http.get('http://dscelib.comeze.com/sendnotification.php?id='+notification.regid).
               then(function(result){
                      
               });*/
            //alert('registration ID = ' + notification.regid);
            /*$ionicLoading.show({
          template: 'REGISTRATION ID ' + notification.regid,
          duration:7000
        });*/
            window.localStorage['regid'] = notification.regid;
            /*$ionicLoading.show({
      template: notification.regid,
      duration:5000
      
    });*/
            $http.get('http://dscelib.comeze.com/updatedeviceid.php?usn='+(JSON.parse(window.localStorage['id']).usn)+'&device_id='+notification.regid)
               .then(function(result){

               });
          }
          else
          {
            $ionicLoading.show({
          template: 'no reg id returned ',
          duration:7000
        });
          }
          break;

        case 'message':
        /*$ionicLoading.show({
          template: notification.message,
          duration:7000
        });
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);*/
          break;

        case 'error':
        $ionicLoading.show({
          template: notification.msg,
          duration:7000
        });
          alert('GCM error = ' + notification.msg);
          break;

        default:
        $ionicLoading.show({
          template:'unknown',
          duration:7000
        });
          alert('An unknown GCM event has occurred');
          break;
      }
    });
        
      }
   
  });
  //window.localStorage.removeItem('id');
  //$rootScope.menuButton=false;
  
  
  if(window.localStorage['id'])
  {
      
      document.getElementById('menu-usn').innerHTML=JSON.parse(window.localStorage['id']).fname;
      document.getElementById('menu-dp').src=JSON.parse(window.localStorage['id']).imgurl;
       $state.go('tab.home');
     
     }
     else
     {
       
      $ionicSideMenuDelegate.canDragContent(false);
        $state.go('tab.chats');
      }

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache:false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      cache:false,
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      cache:false,
      url: '/account/chat-detail',
      views: {
        'tab-account': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    cache:false,
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.create-account',{
    cache:false,
    url:'/chats/create-account',
    views:{
      'tab-chats':{
        templateUrl:'templates/create-account.html',
        controller:'CreateAccountCtrl'
      }
    }
  })
  .state('tab.attendance',{
    cache:false,
    url:'/account/attendance',
    views:{
      'tab-account':{
        templateUrl:'templates/attendance.html',
        controller:'AttendanceCtrl'
      }
    }
  })
  .state('tab.transactions',{
    cache:false,
    url:'/account/transactions',
    views:{
      'tab-account':{
        templateUrl:'templates/transactions.html',
        controller:'TransactionCtrl'
      }
    }
  })

  .state('tab.home',{
    cache:false,
    url:'/chats/home',
    views:{
      'tab-chats':{
        templateUrl:'templates/logged-in.html',
        controller:'HomeCtrl'
      }
    }
  })
  .state('tab.schedule',{
    cache:false,
    url:'/account/schedule',
    views:{
      'tab-account':{
        templateUrl:'templates/schedule.html',
        controller:'ScheduleCtrl'
      }
    }
  })
  .state('tab.sign-up',{
    cache:false,
    url:'/chats/create-account/sign-up',
    views:{
      'tab-chats':{
        templateUrl:'templates/sign-up.html',
        controller:'SignupCtrl'
      }
    }
  })
  .state('tab.edit-account-validate-password',{
    cache:false,
    url:'/chats/edit-account-validate-password',
    views:{
      'tab-chats':{
        templateUrl:'templates/edit-account-validate-password.html',
        controller:'EditAccountPasswordCtrl'
      }
    }
  })
  .state('tab.edit-account-enter-details',{
    cache:false,
    url:'/chats/edit-account-enter-details',
    views:{
      'tab-chats':{
        templateUrl:'templates/edit-account-enter-details.html',
        controller:'EditAccountDetailsCtrl'
      }
    }
  })
  .state('tab.assignments',{
    cache:false,
    url:'/account/assignments',
    views:{
      'tab-account':{
        templateUrl:'templates/assignments.html',
        controller:'AssignmentsCtrl'
      }
    }
  })
  .state('tab.issued_books',{
    cache:false,
    url:'/account/issued_books',
    views:{
      'tab-account':{
        templateUrl:'templates/issued_books.html',
        controller:'IssuedBooksCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/chats');

});
