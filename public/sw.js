const CACHE_NAME = 'etiqueta-plus-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Intercepta peticiones para cumplir con los requisitos de PWA
  // y permite que la app funcione si hay un fallo temporal de red.
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
