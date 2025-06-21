const CACHE_NAME = 'aniarchive-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.jsx',
  '/src/App.jsx',
  '/src/components/common/Header.jsx',
  '/src/components/common/Footer.jsx',
  '/src/components/sections/HeroSection.jsx',
  '/src/components/sections/AboutSection.jsx',
  '/src/images/logo.png',
  '/src/images/aug2nd25.png',
  '/src/styles/mobile.css',
  '/src/styles/fonts.css',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 