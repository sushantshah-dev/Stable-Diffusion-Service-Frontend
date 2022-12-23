//Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                'index.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            caches.open('v1').then(function(cache) {
                cache.put(event.request, response);
            });
            return response.clone();
        }).catch(function() {
            return caches.match(event.request);
        })
    );
});