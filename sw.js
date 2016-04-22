importScripts('/progressive-web-app-demo/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('app').then(function(cache) {
      return cache.addAll([
        '/progressive-web-app-demo/',
        '/progressive-web-app-demo/index.html',
        '/progressive-web-app-demo/main.css',
        '/progressive-web-app-demo/main.js',
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
