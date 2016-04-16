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
.controller('EditAccountPasswordCtrl',function($scope,$state,$ionicLoading,$http,$ionicPlatform,$cordovaDatePicker,$cordovaFileTransfer,$cordovaImagePicker,$ionicHistory){
    $scope.user={};
    $scope.temp={};
    $scope.user = JSON.parse(window.localStorage['id']);
    $scope.validate = function(){
    $http.get('http://dscelib.comeze.com/uservalidate.php?usn='+JSON.parse(window.localStorage['id']).usn+'&password='+$scope.temp.password)
         .then(function(result){
               if(result.data[0]==0||result.data[0]=='n')
               {
                   $ionicLoading.show({
                            template:"Invalid password. Enter again..",
                            duration:2000
                   }); 
               }
               else{

                $state.go('tab.edit-account-enter-details');
               }
         });
       }
})

.controller('EditAccountDetailsCtrl',function($rootScope,$scope,$timeout,$ionicHistory,$state,$ionicLoading,$http,$ionicPlatform,$cordovaDatePicker,$cordovaFileTransfer,$cordovaImagePicker){
    $scope.user = JSON.parse(window.localStorage['id']);

    $scope.pick_date= function(){
    var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  $ionicPlatform.ready(function(){


    $cordovaDatePicker.show(options).then(function(date){
         $scope.user.dob=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        //alert(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
    });
  });

  
  }
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
       
     $http.get('http://dscelib.comeze.com/edit-account.php?fname='+$scope.user.fname+"&usn="+$scope.user.usn+"&mail="+$scope.user.email+"&phone="+$scope.user.pnumber+"&imgurl="+$scope.user.imgurl+"&sem="+$scope.user.sem+"&section="+$scope.user.section+"&course="+$scope.user.course+"&dob="+$scope.user.dob+"&gender="+$scope.user.gender)
        .then(function(result){

               if($scope.user.imgurl!=('http://dscelib.comeze.com/uploads/'+$scope.user.usn+'.jpg')){
                             $ionicPlatform.ready(function(){
         var options = new FileUploadOptions();
        options.fileKey="fileToUpload";
        options.fileName = $scope.user.usn+".jpg";
        options.chunkedMode = false;
         /*$ionicLoading.show({
               template:'Signing in....'
         });*/
          $cordovaFileTransfer.upload('http://dscelib.comeze.com/changeimage.php', $scope.user.imgurl, options)
      .then(function(results) {
        $timeout(function(){
             window.localStorage['id']=JSON.stringify(result.data[0]);
             $rootScope.imgurlreturned= JSON.parse(window.localStorage['id']).imgurl;
             $ionicLoading.hide();
             $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
             
                                
                                $state.go('tab.home');
                                                    },1000);
             //window.localStorage['id'].imgurl=JSON.stringify(result.data[0]).imgurl;
            //$state.go ('tab.home');
      }, function(err) {
        $timeout(function(){
             window.localStorage['id']=JSON.stringify(result.data[0]);
              $rootScope.imgurlreturned= JSON.parse(window.localStorage['id']).imgurl;

             $ionicLoading.hide();
             $ionicHistory.nextViewOptions({
  //disableAnimate: true,
 // disableBack: true,
  historyRoot:true
});
             
                                
                                $state.go('tab.home');
                                                    },1000);
      }, function (progress) {
        $ionicLoading.show({
                template:'Signing in...',

        });

      });

});//end of ionicPlatform.ready
}//end of if
else
{
  window.localStorage['id'] = JSON.stringify(result.data[0]);
  $timeout(function(){
  $state.go('tab.home');
},1000);
}


        });//end of http.get
    
      
  }

})

.controller('SignupCtrl',function($scope,$state,$ionicHistory,$ionicPlatform,$cordovaDatePicker,$http,$cordovaFileTransfer,$cordovaImagePicker,$ionicLoading){
  
  $scope.user={};
  $scope.user.imgurl="img/noimage.gif";
  $scope.testpush  = function(){
    $http.get('http://dscelib.comeze.com/testnotif.php?id='+window.localStorage['regid']).
               then(function(result){
                      
               });
  }
  $scope.pick_date= function(){
    var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  $ionicPlatform.ready(function(){


    $cordovaDatePicker.show(options).then(function(date){
         $scope.user.dob=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        //alert(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
    });
  });

  
  }
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
    //console.log($scope.user.sem);
    if($scope.user.usn!==undefined&&$scope.user.fname!==undefined&&$scope.user.password!==undefined&&$scope.user.pnumber!==undefined&&$scope.user.email!==undefined)
    {
    $http.get('http://dscelib.comeze.com/usersphp.php?fname='+$scope.user.fname+"&usn="+$scope.user.usn+"&pass="+$scope.user.password+"&mail="+$scope.user.email+"&phone="+$scope.user.pnumber+"&imgurl="+$scope.user.imgurl+"&sem="+$scope.user.sem+"&section="+$scope.user.section+"&course="+$scope.user.course+"&dob="+$scope.user.dob+"&gender="+$scope.user.gender)
      .then(function(result){

        //console.log(result.data[0]);
        if(result.data[0]=='n')
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
         /*$ionicLoading.show({
               template:'Signing in....'
         });*/
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
      else{
        $ionicLoading.show({
               template:'Invalid data. Please enter again',
               duration:3000
        });
      } 
  }
})
.controller('AssignmentsCtrl',function($scope,$cordovaNetwork,$cordovaInAppBrowser,$http,$ionicPlatform,$ionicLoading){
 
  $scope.down=function(imgurl){
           // File for download
           var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };
           // File for download
$ionicPlatform.ready(function() {

     $cordovaInAppBrowser.open(imgurl, '_system', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });

        

   });
 
 

    }

  $scope.assignments = {};
    $ionicLoading.show({
  templateUrl:'templates/spinner3.html'
});
    $http.get('http://dscelib.comeze.com/getassignments.php?sem=7')
       .then(function(results){

        console.log(results.data);
        for(i=0;i<results.data.length;i++)
        {
          $scope.assignments[i]=results.data[i];
          /*console.log($scope.assignments[i].status);
          if($scope.assignments[i].status==0)
          {
            $scope.assignments[i].submitted=false;
            $scope.assignments[i].notsubmitted=true;
          }
          else
          {
            $scope.assignments[i].notsubmitted=false;
            $scope.assignments[i].submitted=true;
          }*/
          
        }
        $ionicLoading.hide();
          /* window.localStorage['assignments'] = JSON.stringify(results.data);

$scope.assignments.num = JSON.parse(window.localStorage['assignments']).assignment_num;
    $scope.assignments.name= JSON.parse(window.localStorage['assignments']).assignment_name;
    $scope.assignments.questions = JSON.parse(window.localStorage['assignments']).num_of_q;
    $scope.assignments.url = JSON.parse(window.localStorage['assignments']).assignment_url;*/
    

       });
  
  
    
    
  

})
.controller('DashCtrl', function($scope,Chats,$cordovaImagePicker,$state,$timeout,$ionicLoading,$ionicSideMenuDelegate,$cordovaFileTransfer,$ionicPlatform,$http) {
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
    $http.get('http://dscelib.comeze.com/getsubjects.php')
       .then(function(result){
               console.log(result.data[0]);
               $scope.subjects = result.data;
       });
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
.controller('AttendanceCtrl',function($scope,$ionicHistory,$ionicLoading,$log,$state,Chats,$http,$window){
  

 $scope.user=JSON.parse(window.localStorage['id']);

$ionicLoading.show({
  templateUrl:'templates/spinner3.html'
});
$http.get('http://dscelib.comeze.com/check_attendance.php?usn='+JSON.parse(window.localStorage['id']).usn)
        .then(function(result){
               //$scope.posts=[];
               $scope.marks={};
               console.log(result.data);
               
               if(result.data!="null")
               {

                $scope.results=result.data;
                //$scope.marks = $scope.results;
                
               }
               for(var i=0;i<$scope.results.length;i++){
                $scope.results[i].average = Math.round((parseInt($scope.results[i].ia1) + parseInt($scope.results[i].ia2) + parseInt($scope.results[i].ia3))/3);
                $scope.results[i].attendance = Math.round($scope.results[i].attendance/$scope.results[i].total_classes*100);
                $scope.overall_attendance += $scope.results[i].attendance;
                } 
                $scope.overall_attendance = Math.round($scope.overall_attendance/i*100)/100;
              
              
        });
        $ionicLoading.hide();
        
})
.controller('TransactionCtrl',function($scope,$ionicHistory,$log,$state,Chats,$http,$window){
  $scope.fine=0;

  //document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
  if(window.localStorage['id'])
  {
      $scope.transactionsdp=JSON.parse(window.localStorage['id']).imgurl;
   // document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
//document.getElementById('fine-span').innerHTML=JSON.parse(window.localStorage['id']).fine;
}
   //else
 //document.getElementById('fine-span').innerHTML=$scope.fine;
   $http.get('http://dscelib.comeze.com/finecalculate.php?usn='+JSON.parse(window.localStorage['id']).usn)
        .then(function(result){
               //$scope.posts=[];
               
               console.log(result.data);
               document.getElementById('fine-span').innerHTML=result.data[0];
               
                 
        
              
        });
console.log($scope.fine);

//$scope.transactions=Chats.gettransactions();

$http.get('http://dscelib.comeze.com/transaction_details.php?usn='+JSON.parse(window.localStorage['id']).usn)
        .then(function(result){
               //$scope.posts=[];
               
               console.log(result.data);
               
               if(result.data!="null")
               {
                $scope.results=result.data;
                
               }
               else
                $window.alert('No book issued');
                 
        
              
        });
})
.controller('IssuedBooksCtrl',function($scope,$ionicHistory,$log,$state,Chats,$http,$window,$ionicLoading){
  

  //document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
  if(window.localStorage['id'])
  {
      $scope.transactionsdp=JSON.parse(window.localStorage['id']).imgurl;
   // document.getElementById('transactionsdp').src=JSON.parse(window.localStorage['id']).imgurl;
//document.getElementById('fine-span').innerHTML=JSON.parse(window.localStorage['id']).fine;
}
 
$ionicLoading.show({
    templateUrl:'templates/spinner3.html'
});
$http.get('http://dscelib.comeze.com/issued_books_details.php?usn='+JSON.parse(window.localStorage['id']).usn)
        .then(function(result){
               //$scope.posts=[];
               
               console.log(result.data);
               
               if(result.data!="null")
               {
                $scope.results=result.data;
                $scope.fine=JSON.parse(window.localStorage['id']).fine;
                
               }
               else
                $window.alert('No book issued');
                 
        $ionicLoading.hide();
              
        });
        $scope.reissue = function(bookid,reissueflag){
          console.log(reissueflag);
          console.log(bookid);
          if(parseInt(reissueflag)==1)
            $window.alert("This book has already been re-issued once.Can't be re-issued anymore.");
          else
          {
            $ionicLoading.show({
                    template:'Connecting to server...'
            });
            $http.get('http://dscelib.comeze.com/reissue.php?usn='+JSON.parse(window.localStorage['id']).usn+'&Id='+bookid)
        .then(function(result){
               //$scope.posts=[];
               
               
                $window.alert('Your book has been re-issued successfully');
                $ionicLoading.hide();
                 
        
              
        });

          }

        }
})

.controller('ScheduleCtrl',function($scope,Chats,$state,$ionicLoading,$ionicPlatform,$http,$cordovaInAppBrowser){

   
    $http.get('http://dscelib.comeze.com/getschedule.php?sem='+JSON.parse(window.localStorage['id']).sem+'&section='+JSON.parse(window.localStorage['id']).section)
        .then(function(result){
                       console.log(result.data[0]);
                      Chats.setschedule(result.data[0]);
        });
   var d = new Date();
   var i = d.getDay();

   $scope.temp_schedule = Chats.getschedule();
   $scope.schedule = $scope.temp_schedule[i];
$scope.flag="true";

$scope.showschedule = function(){
  console.log(this.days);
   document.getElementById('week-day').innerHTML=this.days;
   //$scope.d = $scope.day;
    $scope.temp_schedule = Chats.getschedule();
    $scope.flag="true";
       //$state.go('tab.schedule');
       switch(this.days){
                       case 'Monday': i=0;
                       break;
                       case 'Tuesday': i=1;
                       break;
                       case 'Wednesday': i=2;
                       break;
                       case 'Thursday': i=3;
                       break;
                       case 'Friday': i=4;
                       break;
                       case 'Saturday': i=5;
                       break;
       }
     $scope.schedule = $scope.temp_schedule[i];
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
.controller('HomeCtrl',function($rootScope,$scope,$state,$location,$ionicSideMenuDelegate,$ionicHistory,$ionicLoading,$timeout,$cordovaNetwork){
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
    $scope.user = JSON.parse(window.localStorage['id']);
   $scope.user.imgurl=$rootScope.imgurlreturned;
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
    $scope.attendance=function(){
      $state.go('tab.attendance');
    }
    $scope.issued_books=function(){
      $state.go('tab.issued_books');
    }

      
    
})

.controller('ChatsCtrl', function($scope, Chats,$state,$timeout,$location,$ionicHistory,$ionicSideMenuDelegate,$ionicLoading,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
      window.localStorage.removeItem('id');
      $http.get('http://dscelib.comeze.com/removeregid.php?device_id='+window.localStorage['regid']).
        then(function(result){
          $timeout(function(){

               
      //window.localStorage.removeItem('search');
      $ionicSideMenuDelegate.canDragContent(false);
      
      $ionicHistory.clearHistory();

      },0);
     
        });
      
      
   $scope.search = function()
    {
        $state.go('tab.chat-detail');
    }
    $scope.createaccount = function()
    {
      $state.go('tab.create-account');
    }
  
  
})
.controller('CreateAccountCtrl',function($scope,$log,$q,$http,$timeout,$ionicPlatform,$ionicLoading,$state,$ionicHistory,UserService,$cordovaPush){
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
    $http.get('http://dscelib.comeze.com/login.php?usn='+$scope.usn+'&password='+$scope.password)
        .then(function(result){
               //$scope.posts=[];
               
              //console.log(result.data[0]);
              if(!(result.data[0]=='n'||result.data[0]==0))
              {

              window.localStorage['id']=JSON.stringify(result.data[0]);
              console.log(JSON.parse(window.localStorage['id']).usn);
              $ionicPlatform.ready(function(){
                     var androidConfig = {
                              "senderID": "603788932936",
                        };
                      
                       $cordovaPush.register(androidConfig).then(function(result) {
                                document.getElementById('menu-usn').innerHTML=JSON.parse(window.localStorage['id']).usn;
                                $timeout(function(){
                                $ionicLoading.hide();
                                $state.go('tab.home');
                                                    },3000);
            
                          }, function(err) {
                                $ionicLoading.show({
                                template: err,
                                duration:7000
                          });
            // Error
                          })
                       
              });
              
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
.controller('ChatDetailCtrl', function($window,$scope, $stateParams, Chats,$state,$http,$log,$ionicLoading,$ionicPlatform) {
  //$scope.chat = Chats.get($stateParams.chatId);
  //$scope.results = Chats.getrecommendations();
 if(window.localStorage['search'])
 {
    $scope.results=JSON.parse(window.localStorage['search']);
    $scope.count = $scope.results.length + " recommendations found";
  }
   else
     $scope.count = "No results found";
   $scope.reserve = function(bookname,author,publication,id,availability){
      console.log(JSON.parse(window.localStorage['id']).usn);
      //console.log(bookname);
      //console.log(author);
      if(availability==0)
        $window.alert('Sorry book is not available');
      else
      {
        $ionicLoading.show({
                  template:'Connecting to server...'
        });
        $http.get('http://dscelib.comeze.com/login.php?usn='+JSON.parse(window.localStorage['id']).usn+'&password='+JSON.parse(window.localStorage['id']).password)
        .then(function(result){
               
               console.log(JSON.stringify(result.data[0].count));
               if(result.data[0].count<=0)
               {
                  $window.alert('Limit Exceeded');
                  $ionicLoading.hide();
                }
                else
                {
                    $http.get('http://dscelib.comeze.com/confirmphp.php?Usn='+JSON.parse(window.localStorage['id']).usn+'&Id='+id+'&BookName='+bookname+'&Pub='+publication)
        .then(function(result){
               
               console.log(JSON.stringify(result.data));
               document.getElementById(id).innerHTML="Reserved";
               document.getElementById(id).colour = "red";
               
               $window.alert('Your book has been reserved');
               $ionicLoading.hide();
              
        });
                }
               
              
        });
      
      }
   }

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
