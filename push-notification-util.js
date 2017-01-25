'use strict';

var applicationServerKey = 'BPTCFPTpGNJzo1MxjLNY4KgKyaFpL0fnP5EVVzdx8QgI5EhrWnsFukEnP-2AP1dHloGkN9VBNl-2flyUWNHaAyU'
var serviceWorkerRegistration;
var polytimerApp = document.querySelector('polytimer-app');

//Unit Conversion tool
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

function getUserSubscriptionStatus(){
  var subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
  };
  serviceWorkerRegistration.pushManager.permissionState(subscribeOptions).then(function(state){
    // console.log(state);
    if(state === 'granted'){
      polytimerApp.setAttribute('user-subscribed-for-push', '');      
    }
  }).catch(function(error){
    console.log(error);
  });
};

function subscribeUserToPush() {
    var subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
    };
    serviceWorkerRegistration.pushManager.subscribe(subscribeOptions)
    .then(function(pushSubscription) {
      polytimerApp.setAttribute('user-subscribed-for-push', '');
      // console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
    }).catch(function(error){
      console.log(error);
    });
};

function askingForNotificationPermission(){
  // console.log('what!');
  return new Promise(function(resolve, reject) {
    var permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
      subscribeUserToPush();
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
};
