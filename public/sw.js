const CACHE_NAME = 'tawseel-v25';

const getBase = () => {
  return self.location.pathname.includes('/Tawseel-app') ? '/Tawseel-app' : '';
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  const base = getBase();
  const assets = [
    `${base}/`,
    `${base}/index.html`,
    `${base}/manifest.json`,
    `${base}/favicon.png`,
    `${base}/icon-192.png`,
    `${base}/icon-512.png`,
    `${base}/icon-maskable-192.png`,
    `${base}/icon-maskable-512.png`,
    `${base}/apple-touch-icon.png`
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        assets.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Cache asset skip:', url, err);
          })
        )
      );
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

  // For app icons and images: Cache-First with Network fallback (Guarantees icons never corrupt or fail offline)
  if (
    event.request.url.includes('/icon') ||
    event.request.url.includes('/favicon') ||
    event.request.url.includes('/apple-touch-icon') ||
    event.request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Return cached fallback 512 or 192 icon if present
            const base = getBase();
            return (
              caches.match(`${base}/icon-512.png`) ||
              caches.match(`${base}/icon-192.png`) ||
              caches.match('./icon-512.png') ||
              caches.match('/icon-512.png')
            );
          });
      })
    );
    return;
  }

  // Network first, fallback to cache for other assets
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
            const base = getBase();
            return (
              caches.match(`${base}/index.html`) ||
              caches.match(`${base}/`) ||
              caches.match('./index.html') ||
              caches.match('/')
            );
          }
          return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
        });
      })
  );
});
