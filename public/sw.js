const CACHE_NAME = 'tawseel-v29-offline';

const getBasePath = () => {
  if (typeof self !== 'undefined' && self.location) {
    if (self.location.pathname.includes('/Tawseel-app')) {
      return '/Tawseel-app';
    }
  }
  return '';
};

// Core Shell Assets to pre-cache on install
const getCoreAssets = () => {
  const base = getBasePath();
  const list = [
    './',
    './index.html',
    './manifest.json',
    './favicon.png',
    './apple-touch-icon.png',
    './icon.png',
    './icon.svg',
    './icon-192.png',
    './icon-512.png',
    './icon-maskable-192.png',
    './icon-maskable-512.png'
  ];

  if (base) {
    list.push(
      `${base}/`,
      `${base}/index.html`,
      `${base}/manifest.json`,
      `${base}/favicon.png`,
      `${base}/apple-touch-icon.png`,
      `${base}/icon-192.png`,
      `${base}/icon-512.png`
    );
  }

  return list;
};

// 1. Install Event: Precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use catch on each entry so one missing asset doesn't fail the entire SW install
      const assets = getCoreAssets();
      return Promise.all(
        assets.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn(`[SW] Precache item failed (harmless): ${url}`, err);
          });
        })
      );
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// 2. Activate Event: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 3. Fetch Event: Multi-tier offline caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  const url = new URL(request.url);

  // A. Navigation / Document Requests (Opening the app / page load)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              const base = getBasePath();
              cache.put(request, copy);
              if (base) {
                cache.put(`${base}/index.html`, networkResponse.clone());
                cache.put(`${base}/`, networkResponse.clone());
              }
              cache.put('./index.html', networkResponse.clone());
              cache.put('./', networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          console.log('[SW] Offline navigation, resolving from cache...');
          const cache = await caches.open(CACHE_NAME);
          const base = getBasePath();
          
          // Try exact match first
          let cached = await cache.match(request);
          if (cached) return cached;

          // Try base-specific index.html
          if (base) {
            cached = await cache.match(`${base}/index.html`);
            if (cached) return cached;
            cached = await cache.match(`${base}/`);
            if (cached) return cached;
          }

          // Try generic index.html
          cached = await cache.match('./index.html');
          if (cached) return cached;
          cached = await cache.match('/index.html');
          if (cached) return cached;
          cached = await cache.match('./');
          if (cached) return cached;

          // Fallback offline HTML page if absolutely nothing is found in cache
          return new Response(
            `<!DOCTYPE html>
            <html lang="ar" dir="rtl">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>توصيل - وضع عدم الاتصال</title>
                <style>
                  body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
                  .card { background: #1e293b; padding: 32px 24px; border-radius: 24px; max-width: 380px; width: 100%; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5); }
                  .icon { font-size: 48px; margin-bottom: 16px; }
                  h1 { font-size: 20px; font-weight: 800; margin: 0 0 8px; color: #f97316; }
                  p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px; }
                  .btn { background: #f97316; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; width: 100%; box-sizing: border-box; }
                  .btn:hover { background: #ea580c; }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="icon">📶</div>
                  <h1>تطبيق توصيل (أوفلاين)</h1>
                  <p>أنت حالياً غير متصل بالإنترنت. يرجى التأكد من تشغيل البيانات أو شبكة Wi-Fi وإعادة المحاولة.</p>
                  <button class="btn" onclick="window.location.reload()">إعادة المحاولة 🔄</button>
                </div>
              </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // B. Static Assets: JS bundles, CSS files, Web Fonts, and Images
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font' ||
    request.destination === 'image' ||
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/fonts/') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Fetch from network to update cache in background
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch((err) => {
            // Network failed, return cached response if available
            return cachedResponse;
          });

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // C. Default Fallback Strategy (Network first with cache fallback)
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});


