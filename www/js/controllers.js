angular.module('starter.controllers', [])
.controller('MainCtrl',function($scope,$ionicSideMenuDelegate,$rootScope,Transactions,$state){
    $scope.transactions = function()
    {
           $state.go('tab.transactions');
    }
      if(window.localStorage['id'])
       $scope.menuButton = true;
     else
        $scope.menuButton = false;
    
})

.controller('SignupCtrl',function($scope,$state,$ionicHistory,$ionicPlatform,$http,$cordovaFileTransfer,$cordovaImagePicker,$ionicLoading){
  
  $scope.user={};
  $scope.user.imgurl="img/noimage.gif";
  
    $scope.up=function(){
      $ionicPlatform.ready(function(){
       
              var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
     
      for (var i = 0; i < results.length; i++) {
        $scope.user.imgurl= results[i];
       document.getElementById('profile-dp').src= $scope.user.imgurl;
        
         
      }
    }, function(error) {
      // error getting photos
    });
    

      });

  }
  $scope.signup=function(){
    if($scope.user.usn!==undefined&&$scope.user.fname!==undefined&&$scope.user.password!==undefined&&$scope.user.pnumber!==undefined&&$scope.user.email!==undefined)
    {
    $http.get('http://dscelib.comeze.com/usersphp.php?Fname='+$scope.user.fname+"&Usn="+$scope.user.usn+"&Pass="+$scope.user.password+"&Mail="+$scope.user.email+"&Phone="+$scope.user.pnumber+"&Imgurl="+$scope.user.imgurl)
      .then(function(result){

        console.log(result.data[0]);
        if(result.data=='null')
        {
           $ionicLoading.show({
                  template:'Usn already exists in our database. Try again',
                  duration:3000
           });

        }
        else
        {
          $ionicPlatform.ready(function(){
         var options = new FileUploadOptions();
        options.fileKey="fileToUpload";
        options.fileName = $scope.user.usn+".jpg";
        options.chunkedMode = false;
 
          $cordovaFileTransfer.upload('http://dscelib.comeze.com/imageupload.php', $scope.user.imgurl, options)
      .then(function(results) {
             window.localStorage['id']=JSON.stringify(result.data[0]);
             $ionicLoading.hide();
             $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
             //window.localStorage['id'].imgurl=JSON.stringify(result.data[0]).imgurl;
            $state.go ('tab.home');
      }, function(err) {
             window.localStorage['id']=JSON.stringify(result.data[0]);
             $ionicLoading.hide();
             $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
             $state.go('tab.home');
      }, function (progress) {
        $ionicLoading.show({
                template:'Signing in...',

        });

      });

});
            
          
          }
         

    
                         
      });
      } 
  }
})
.controller('AssignmentsCtrl',function($scope,$cordovaNetwork,$cordovaInAppBrowser,$http,$ionicPlatform){
 
  $scope.down=function(imgurl){
           // File for download
           var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };
           // File for download
$ionicPlatform.ready(function() {

     $cordovaInAppBrowser.open(imgurl, '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

        

   });
 
 

    }

  $scope.assignments = {};
  
    $http.get('http://dscelib.comeze.com/getassignments.php')
       .then(function(results){
        console.log(results.data);
        for(i=0;i<results.data.length;i++)
        {
          $scope.assignments[i]=results.data[i];
          console.log($scope.assignments[i].status);
          if($scope.assignments[i].status==0)
          {
            $scope.assignments[i].submitted=false;
            $scope.assignments[i].notsubmitted=true;
          }
          else
          {
            $scope.assignments[i].notsubmitted=false;
            $scope.assignments[i].submitted=true;
          }
          
        }
          /* window.localStorage['assignments'] = JSON.stringify(results.data);

$scope.assignments.num = JSON.parse(window.localStorage['assignments']).assignment_num;
    $scope.assignments.name= JSON.parse(window.localStorage['assignments']).assignment_name;
    $scope.assignments.questions = JSON.parse(window.localStorage['assignments']).num_of_q;
    $scope.assignments.url = JSON.parse(window.localStorage['assignments']).assignment_url;*/
    

       });
  
  
    
    
  

})
.controller('DashCtrl', function($scope,Chats,$cordovaImagePicker,$state,$timeout,$ionicLoading,$ionicSideMenuDelegate,$cordovaFileTransfer,$ionicPlatform) {
    if(window.localStorage['id'])
    {
       $scope.menuButton = true;

       $ionicSideMenuDelegate.canDragContent(true);
     }
     else
     {
        $scope.menuButton = false;
      $ionicSideMenuDelegate.canDragContent(false);
    }
       
    $scope.recommendations = Chats.getrecommendations();
    $scope.up=function(){

      $ionicPlatform.ready(function(){
       
              var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
     
      for (var i = 0; i < results.length; i++) {
        var options = new FileUploadOptions();
        options.fileKey="fileToUpload";
        options.fileName = JSON.parse(window.localStorage['id']).usn+".jpg";
        options.chunkedMode = false;
        
         $cordovaFileTransfer.upload('http://dscelib.comeze.com/imageupload.php', results[i], options)
      .then(function(result) {
       
      }, function(err) {
       
      }, function (progress) {
        // constant progress updates
      });
      }
    }, function(error) {
      // error getting photos
    });
    

      });
    }
    $scope.down=function(){
      var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
           // File for download
$ionicPlatform.ready(function() {

     $cordovaInAppBrowser.open('http://dscelib.comeze.com/VTU-time-table-for-1st-Sem.jpg', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

        

   });
 

    }
    $scope.search = function()
    {
        $state.go('tab.chat-detail');
    }
    
})
.controller('AttendanceCtrl',function($scope){
  
})
.controller('TransactionCtrl',function($scope,$ionicHistory,$log,$state,Chats){
  $scope.fine=0;

  //document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
  if(window.localStorage['id'])
  {
      $scope.transactionsdp=JSON.parse(window.localStorage['id']).imgurl;
   // document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
document.getElementById('fine-span').innerHTML=JSON.parse(window.localStorage['id']).fine;
}
   else
 document.getElementById('fine-span').innerHTML=$scope.fine;
   
console.log($scope.fine);

$scope.transactions=Chats.gettransactions();
})
.controller('ScheduleCtrl',function($scope,Chats,$state,$ionicLoading,$ionicPlatform,$cordovaInAppBrowser){
   var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
$scope.flag="true";
//$scope.d = $scope.day;
$scope.schedule = Chats.getschedule();
//$scope.schedule = $scope.shed[d];
$scope.showschedule = function(){
  console.log(this.days);
   document.getElementById('week-day').innerHTML=this.days;
   //$scope.d = $scope.day;
    $scope.schedule = Chats.getschedule();
    $scope.flag="true";
       $state.go('tab.schedule');
}
$scope.down=function(){
           // File for download
           var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };
           // File for download
$ionicPlatform.ready(function() {

     $cordovaInAppBrowser.open('http://dscelib.comeze.com/class-time-table-8a.jpg', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

        

   });
 
 

    }

})
.controller('HomeCtrl',function($scope,$state,$location,$ionicSideMenuDelegate,$rootScope,$ionicHistory,$ionicLoading,$timeout,$cordovaNetwork){
  $rootScope.flag=0;
  $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
           $ionicLoading.hide();
  });
  $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        $ionicLoading.show({
          template: 'No network found .Please turn on the Internet..'
        })
  });
   if(!window.localStorage['id'])
   {
    $ionicSideMenuDelegate.canDragContent(false);
      $state.go('tab.chats'); 
    }

   else
   { 
    $scope.user={};
    $scope.user.imgurl=JSON.parse(window.localStorage['id']).imgurl;
    $scope.menuButton=true;

    $ionicSideMenuDelegate.canDragContent(true);
    $timeout(function(){
    document.getElementById('menu-usn').innerHTML=JSON.parse(window.localStorage['id']).fname;
      document.getElementById('menu-dp').src=JSON.parse(window.localStorage['id']).imgurl;

    //document.getElementById('profile-dp').src=
    document.getElementById('profile-name').innerHTML=JSON.parse(window.localStorage['id']).fname;
   // document.getElementById('home-fine').innerHTML=JSON.parse(window.localStorage['id']).fine;
    document.getElementById('profile-usn').innerHTML=JSON.parse(window.localStorage['id']).usn;
},0);
   }
      //document.getElementById('profile-usn').innerHTML=window.localStorage['id'].usn; 
    $scope.transactions=function()
    {
      $state.go('tab.transactions');
    }
    $scope.assignments = function(){
      $state.go('tab.assignments');
    }
    $scope.search=function()
    {
      
      //$location.path('/dash/chat-detail');
      $state.go('tab.chat-detail');
    }
    $scope.schedule=function()
    {
      
      //$location.path('/dash/chat-detail');
      $state.go('tab.schedule');
    }

      
    
})

.controller('ChatsCtrl', function($scope, Chats,$state,$timeout,$location,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
      $timeout(function(){
               window.localStorage.removeItem('id');
      //window.localStorage.removeItem('search');
      $ionicSideMenuDelegate.canDragContent(false);
      
      $ionicHistory.clearHistory();

      },0);
     
      
   $scope.search = function()
    {
        $state.go('tab.chat-detail');
    }
    $scope.createaccount = function()
    {
      $state.go('tab.create-account');
    }
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('CreateAccountCtrl',function($scope,$log,$q,$http,$timeout,$ionicLoading,$state,$ionicHistory,UserService){
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      
      window.localStorage['fb'] = JSON.stringify(profileInfo);
      
      
      /*UserService.setUser({
        authResponse: authResponse,
        usn: profileInfo.id,
        fname: profileInfo.name,
        email: profileInfo.email,
        imgurl : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });*/
      $ionicLoading.hide();
      $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
      $state.go('tab.home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){

      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved

       // var user = UserService.getUser('facebook');

         
        if(!window.localStorage['fb']){
         
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {

            
            window.localStorage['fb'] = JSON.stringify(profileInfo);
            window.localStorage['id'].fname = JSON.parse(window.localStorage['fb']).name;

$ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
       

            $state.go('tab.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
          $state.go('tab.home');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

 
  $scope.login=function(){
    $ionicLoading.show({
      templateUrl: 'templates/spinner1.html',
      duration:7000
      
    }); 
    $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
    $http.get('http://dscelib.comeze.com/uservalidate.php?usn='+$scope.usn+'&password='+$scope.password)
        .then(function(result){
               //$scope.posts=[];
               
              console.log(result.data[0]);
              if(!(result.data=='null'))
              {
              window.localStorage['id']=JSON.stringify(result.data[0]);
              document.getElementById('menu-usn').innerHTML=JSON.parse(window.localStorage['id']).usn;
              $timeout(function(){
          $ionicLoading.hide();
        $state.go('tab.home');
      },3000);
    //console.log(window.localStorage['id'].usn);
              }
              else
              {
                $ionicLoading.show({
      templateUrl: 'templates/spinner2.html',
      duration:3000
      
    }); 
              }
        });
        
        
  }
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$state,$http,$log,$ionicLoading,$ionicPlatform) {
  //$scope.chat = Chats.get($stateParams.chatId);
  //$scope.results = Chats.getrecommendations();
 if(window.localStorage['search'])
 {
    $scope.results=JSON.parse(window.localStorage['search']);
    $scope.count = $scope.results.length + " recommendations found";
  }
   else
     $scope.count = "No results found";

  $scope.search = function()
  {
    
    
  $ionicLoading.show({
      templateUrl: 'templates/spinner.html',
      duration:2000
      
    }); 
  
 // $cordovaProgress.showText(false, 100000, "Loading")
    
    //console.log($cordovaNetwork.isOnline());

    

  
  if($scope.search.term===undefined||$scope.search.term==='')
  {
       $ionicLoading.show({
      templateUrl: 'templates/spinner.html',
      duration:1000
      
    }); 
  }
  else
  {
    $http.get('http://dscelib.comeze.com/phptest1.php?Id='+$scope.search.term)
        .then(function(result){
               //$scope.posts=[];
               $log.info($scope.search.term);
               $log.info(result.data[0]);
               
                if(result.data!='null')
               {
               $scope.results=result.data;
               window.localStorage['search']=JSON.stringify(result.data);
               $scope.count = $scope.results.length + " results found for "+$scope.search.term;
              // user.posts = [];
              
              $ionicLoading.hide();
              }
              else 
              {
                 $ionicLoading.hide();
                 $scope.count="No results found for "+$scope.search.term;

               }
              
        });
    
  }
   
    
  
  //$state.go('tab.chat-detail');
};

})

.controller('AccountCtrl', function($scope) {
  
  $scope.settings = {
    enableFriends: true
  };
});
