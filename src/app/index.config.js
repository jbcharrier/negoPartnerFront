export function config ($logProvider, $mdThemingProvider, firebase) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('grey');

  let config = {
    apiKey: "AIzaSyDg41Sa3TqN0eZaUhb1GS7_McmACo8up1c",
    authDomain: "negopartner-a1282.firebaseapp.com",
    databaseURL: "https://negopartner-a1282.firebaseio.com",
    storageBucket: "negopartner-a1282.appspot.com",
    messagingSenderId: "1095092287889"
  };

  firebase.initializeApp(config);
}
