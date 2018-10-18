var staticCacheName = 'restaurant-review-v3';


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/mws-restaurant-stage-1/main.js',
                '/mws-restaurant-stage-1/restaurant_info.js',
                '/mws-restaurant-stage-1/dbhelper.js',
                './mws-restaurant-stage-1/index.html',
                './mws-restaurant-stage-1/restaurant.html',
                './mws-restaurant-stage-1/img/1.jpg',
                './mws-restaurant-stage-1/img/2.jpg',
                './mws-restaurant-stage-1/img/3.jpg',
                './mws-restaurant-stage-1/img/4.jpg',
                './mws-restaurant-stage-1/img/5.jpg',
                './mws-restaurant-stage-1/img/6.jpg',
                './mws-restaurant-stage-1/img/7.jpg',
                './mws-restaurant-stage-1/img/8.jpg',
                './mws-restaurant-stage-1/img/9.jpg',
                './mws-restaurant-stage-1/img/10.jpg',
                './mws-restaurant-stage-1/data/restaurant.json',
                './mws-restaurant-stage-1/css/style.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
                'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
            ]);
        }).then(() =>
            console.log('Cached successfully'))
        .catch(function (err) {
            console.log(err);
            console.log('Something went wrong')
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-review') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
})