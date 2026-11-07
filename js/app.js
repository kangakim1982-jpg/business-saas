
import {
  observeAuthState
} from "./services/auth.service.js";
import { auth, db } from "./config/firebase.js";
import {
  setState,
  getState
} from "./core/state.js";

import {
  registerRoute,
  startRouter,
  navigate
} from "./router.js";

// =========================
// SERVICE WORKER
// =========================

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker tidak didukung.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./sw.js");

    console.log(
      "Service Worker berhasil didaftarkan:",
      registration.scope
    );
  } catch (error) {
    console.error(
      "Gagal mendaftarkan Service Worker:",
      error
    );
  }
}

// =========================
// DASHBOARD
// =========================

function renderDashboard(container) {
  const state = getState();

  container.innerHTML = `
    <section class="content-area">
      <div class="card">
        <h1>Business SaaS</h1>

        <p>
          Platform manajemen bisnis terpadu.
        </p>

        <div style="margin-top: 16px;">
          <strong>Status aplikasi:</strong>
          <span class="badge badge-success">
            Berjalan
          </span>
        </div>

        <div style="margin-top: 12px;">
          <strong>Status akun:</strong>
          <p id="account-status"></p>
        </div>
      </div>
    </section>
  `;

  const accountStatus =
    container.querySelector("#account-status");

  accountStatus.textContent = state.user
    ? `Login sebagai ${state.user.email || "Pengguna"}`
    : "Belum ada pengguna yang login.";
}

// =========================
// ROUTES
// =========================

registerRoute("dashboard", renderDashboard);

// FIREBASE CONNECTION TEST
function testFirebaseConnection() {
  const status = auth && db
    ? "Firebase berhasil diinisialisasi."
    : "Firebase belum terhubung.";

  console.log(status);
}
// =========================
// INITIALIZATION
// =========================

function initializeApp() {
  setState({
    isLoading: true
  });
testFirebaseConnection();
  registerServiceWorker();

  startRouter("dashboard");

  observeAuthState((user) => {
    setState({
      user: user || null,
      isLoading: false,
      isInitialized: true
    });

    navigate("dashboard");
  });
}

initializeApp();
