var staticCacheName = 'restaurant-review-v2';


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/main.js',
                '/restaurant_info.js',
                '/dbhelper.js',
                './index.html',
                './restaurant.html',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
                './data/restaurant.json',
                './css/style.css',
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