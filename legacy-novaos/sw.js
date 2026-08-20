const CACHE_NAME = 'app-cache-v2';
// Relative so the portfolio also works when hosted under a subpath,
// e.g. a GitHub Pages project site.
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/mime-db@1.52.0/db.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;800&display=swap',
  './system32.js',
  './style.css',
  './n.png',
  './nova.css',
  './scripts/edgecases.js',
  './scripts/scripties.js',
  './script.js',
  './scripts/fflate.js',
  './scripts/kernel.js',
  './scripts/readwrite.js',
  './scripts/utility.js',
  './scripts/ctxmenu.js',
  './assets/RamChandra_Beniwal_Resume.pdf',
  './appdata/about.html',
  './appdata/experience.html',
  './appdata/projects.html',
  './appdata/skills.html',
  './appdata/resume.html',
  './appdata/contact.html',
  './appdata/shell.html',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(urlsToCache)
            .catch((error) => {
              console.error('Failed to cache some resources:', error);
              return Promise.all(urlsToCache.map(url => {
                return cache.add(url).catch(err => console.error('Failed to cache', url, err));
              }));
            });
        })
    );
  });
  

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // If there is a cached response, return it.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from the network.
        return fetch(event.request)
          .then((response) => {
            // Check if we got a valid response.
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to ensure it's usable multiple times.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});