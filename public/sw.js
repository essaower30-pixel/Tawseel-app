const CACHE_NAME = 'tawseel-v23';
const ASSETS_TO_CACHE = [
  '/Tawseel-app/',
  '/Tawseel-app/index.html',
  '/Tawseel-app/manifest.json',
  '/Tawseel-app/favicon.png',
  '/Tawseel-app/icon-192.png',
  '/Tawseel-app/icon-512.png',
  '/Tawseel-app/icon-maskable-192.png',
  '/Tawseel-app/icon-maskable-512.png',
  '/Tawseel-app/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  // Network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/Tawseel-app/index.html') || caches.match('/Tawseel-app/');
          }
          return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
        });
      })
  );
});
