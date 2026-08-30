const CACHE_NAME = 'tawseel-v27';

const getBase = () => {
  return self.location.pathname.includes('/Tawseel-app') ? '/Tawseel-app' : '';
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
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

  // HTML navigation requests: ALWAYS network first, do not serve stale HTML
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For app icons and images: Cache-First with Network fallback
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

  // Network first for all JS and CSS assets
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

