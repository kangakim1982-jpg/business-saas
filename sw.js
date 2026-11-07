
const CACHE_NAME = "business-saas-v4";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/variables.css",
  "./css/main.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/responsive.css",

  "./js/app.js",
  "./js/router.js",

  "./js/config/firebase.js",

  "./js/core/state.js",
  "./js/core/events.js",
  "./js/core/validators.js",

  "./js/services/auth.service.js",
  "./js/services/business.service.js",

  "./js/utils/formatter.js",
"./js/utils/helpers.js"
];

// Menyimpan file aplikasi
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// Membersihkan cache versi lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Mengatur permintaan file
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Hanya menangani file dari aplikasi sendiri
  if (url.origin !== self.location.origin) return;

  // Navigasi halaman: utamakan jaringan
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        return await caches.match("./index.html");
      })
    );
    return;
  }

  // File statis: utamakan cache
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request);
    })
  );
});
