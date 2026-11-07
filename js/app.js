import {
  observeAuthState
} from "./services/auth.service.js";

import {
  auth,
  db
} from "./config/firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

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
    const registration =
      await navigator.serviceWorker.register("./sw.js");

    console.log(
      "Service Worker berhasil:",
      registration.scope
    );
  } catch (error) {
    console.error(
      "Service Worker gagal:",
      error
    );
  }
}

// =========================
// FIREBASE CONNECTION TEST
// =========================

async function testFirebaseConnection() {
  const statusElement =
    document.getElementById("firebase-status");

  if (!statusElement) return;

  statusElement.textContent = "Memeriksa koneksi...";

  try {
    await getDoc(
      doc(db, "connection_tests", "connectivity-check")
    );

    statusElement.textContent =
      "Firebase terhubung.";
  } catch (error) {
    console.error("Firebase test:", error);

    if (error.code === "permission-denied") {
      statusElement.textContent =
        "Server merespons, tetapi akses ditolak.";
    } else {
      statusElement.textContent =
        "Koneksi gagal: " + (error.code || "Unknown error");
    }
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

        <div style="margin-top: 12px;">
          <strong>Status Firebase:</strong>
          <p id="firebase-status">
            Menunggu pengujian...
          </p>
        </div>

      </div>
    </section>
  `;

  const accountStatus =
    container.querySelector("#account-status");

  accountStatus.textContent = state.user
    ? `Login sebagai ${state.user.email || "Pengguna"}`
    : "Belum ada pengguna yang login.";

  testFirebaseConnection();
}

// =========================
// ROUTES
// =========================

registerRoute("dashboard", renderDashboard);

// =========================
// INITIALIZATION
// =========================

function initializeApp() {
  setState({
    isLoading: true
  });

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
