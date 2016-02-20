angular.module('starter.services', [])
.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage['id'] = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage['id'] || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var books = [{
    id: 0,
    name: 'Object oriented design and modelling',
    //author: 'Unknown',
    fac: 'Pearson',
    face:'img/adam.jpg',
    info:'Object-oriented modeling is an approach to modeling an application that is used at the beginning of the software life cycle when using an object-oriented approach to software development.'
  }, {
    id: 1,
    name: 'Embedded Computing systems',
    //lastText: 'Hey, it\'s me',
    fac: 'TMC',
    face:'img/ben.png',
        info:'Object-oriented modeling is an approach to modeling an application that is used at the beginning of the software life cycle when using an object-oriented approach to software development.'

  }, {
    id: 2,
    name: 'Programming the web',
    //lastText: 'I should buy a boat',
    fac:'XYZ',
    face: 'img/max.png',
        info:'Object-oriented modeling is an approach to modeling an application that is used at the beginning of the software life cycle when using an object-oriented approach to software development.'

  }, {
    id: 3,
    name: 'Advanced Computer Architecture',
    //lastText: 'Look at my mukluks!',
    fac:'Schildt',
    face: 'img/mike.png',
        info:'Object-oriented modeling is an approach to modeling an application that is used at the beginning of the software life cycle when using an object-oriented approach to software development.'

  }, {
    id: 4,
    name: 'Java',
    //lastText: 'This is wicked good ice cream.',
    fac:'PQR',
    face: 'img/perry.png',
        info:'Object-oriented modeling is an approach to modeling an application that is used at the beginning of the software life cycle when using an object-oriented approach to software development.'

  }];
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
  var Transactions = [{
    id:123453,
    name:'Programming the web',
    author:'Kernighan',
    issued:'23-11-2015 13:45:54',
    returns:'7-12-2015 13:45:54' 
  },
  {
    id:12345123,
    name:'JAVA',
    author:'Schidlt',
    issued:'21-11-2015 22:45:54',
    returns:'5-12-2015 22:45:54' 
  },
  {
    id:456562,
    name:'Embedded Computing System',
    author:'Leonard',
    issued:'14-11-2015 13:45:54',
    returns:'30-11-2015 13:45:54' 
  },
  {
    id:23423,
    name:'Sql Server',
    author:'Oracle',
    issued:'12-07-2015 13:45:54',
    returns:'27-07-2015 13:45:54' 
  }];
  var schedule = [     // section:'7-A',
      {time:'9:00 A.M-10:00 A.M',sub:'OOMD',fac:'Arbind Gupta',imgurl:'img/adam.jpg'},
      {time:'10:00 A.M-11.00 A.M',sub:'Ecs',fac:'Shubha Bhat',imgurl:'img/ben.png'},
      {time:'11:15 A.M-12.15 P.M',sub:'PW',fac:'Kusuma',imgurl:'img/max.png'},
      {time:'12:15 P.M-1:15 P.M',sub:'ACA',fac:'Rashmi S R',imgurl:'img/mike.png'},
      {time:'2:00 P.M-3:00 P.M',sub:'Java',fac:'Poornima A',imgurl:'img/perry.png'},
      {time:'3:00 P.M-4:00 P.M',sub:'C# and .Net',fac:'Shashidar',imgurl:'img/pravdp.jpg'}
  ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getrecommendations:function(){
      return books;
    },
    gettransactions:function(){
      return Transactions;
    },
    getschedule:function(){
      return schedule;
    }
  };
});
