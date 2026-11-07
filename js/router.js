
const routes = new Map();

let currentRoute = null;

// Mendaftarkan halaman
export function registerRoute(path, render) {
  if (typeof render !== "function") {
    throw new TypeError("Render harus berupa fungsi.");
  }

  routes.set(path, render);
}

// Berpindah halaman
export function navigate(path) {
  if (!routes.has(path)) {
    console.warn(`Halaman tidak ditemukan: ${path}`);
    return;
  }

  if (window.location.hash !== `#${path}`) {
    window.location.hash = path;
    return;
  }

  renderRoute(path);
}

// Menampilkan halaman
function renderRoute(path) {
  const render = routes.get(path);

  if (!render) return;

  const container = document.getElementById("main-content");

  if (!container) {
    console.error("Elemen main-content tidak ditemukan.");
    return;
  }

  currentRoute = path;

  render(container);
}

// Menjalankan router
export function startRouter(defaultPath = "dashboard") {
  function handleRouteChange() {
    const path = window.location.hash.slice(1) || defaultPath;

    if (!routes.has(path)) {
      navigate(defaultPath);
      return;
    }

    renderRoute(path);
  }

  window.addEventListener("hashchange", handleRouteChange);

  handleRouteChange();
}

// Mengambil halaman aktif
export function getCurrentRoute() {
  return currentRoute;
}
