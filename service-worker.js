/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint no-console: ["error", { allow: ["info"] }] */

// console.info(
//   'Service worker disabled for development, will be generated at build time.'
// );


self.addEventListener('push', function(event) {
  var title = 'Polytimer';
  var options = {
    "body":   "Time is up!",
    "icon":   "/images/manifest/icon-96x96.png",
    "badge":  "/images/notification/badge-96x96.png",
    "vibrate": [500,100,500,100,500,100,500],
    "tag": 'renotify',
    "renotify": true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('message', function(event) {
  var title = 'Polytimer';
  var options = {
    "body": "Time is up!",
    "icon": "/images/manifest/icon-96x96.png",
    "badge":  "/images/notification/badge-96x96.png",
    "vibrate": [500,100,500,100,500,100,500],
    "tag": 'renotify',
    "renotify": true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
