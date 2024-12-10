const CACHE_NAME = "mi-pwa-cache-v1";
const urlsToCache=[
    './',
    './index.html',
    './app.js',
    './img/icon2.png',
    './img/icon3.png',
    './img/paso.jpeg',
    './img/paso2.jpeg',
    './img/inst.png',
    './img/tik.png',
    './img/face.png',
    './img/nivel3.jpeg',
    './img/nivel2.jpeg',
    './img/nivel1.jpeg',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Abriendo Cache');
            return cache.addAll(urlsToCache); 
        })
    );
});

self.addEventListener('activate', event =>{
    console.log('Service Worker activado');
});

self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
        .then(response =>{
            return response || fetch(event.request);
        })
    );
});

