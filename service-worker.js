const CACHE_NAME = "mi-pwa-cache-v1";
const urlsToCache=[
    './',
    './index.html',
    './app.js',
    './style.css',
    './scripts.js',
    './img/hero3.jpg',
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
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
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

self.addEventListener('fetch', (event) => { 
    if (event.request.url.includes('/games')) 
        { event.respondWith( caches.match(event.request) 
            .then((response) => { 
                if (response) { 
                    return response; 
                } 
                return fetch(event.request).then( (fetchResponse) => { 
                    return caches.open(CACHE_NAME).then((cache) => { 
                        cache.put(event.request, fetchResponse.clone()); 
                        return fetchResponse; 
                    }); 
                } 
            ); 
        }) 
    ); 
    } else { 
        event.respondWith( caches.match(event.request) 
        .then((response) => { 
            return response || fetch(event.request); 
            }) 
        ); 
    } 
});

