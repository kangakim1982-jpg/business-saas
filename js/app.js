import {
  observeAuthState,
  logoutUser
} from "./services/auth.service.js";

import {
  setState,
  getState
} from "./core/state.js";

import {
  registerRoute,
  startRouter,
  navigate
} from "./router.js";

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("./sw.js");
  } catch (error) {
    console.error("Service Worker:", error);
  }
}

function renderDashboard(container) {
  const state = getState();
  const user = state.user;

  container.innerHTML = `
    <div class="bs-layout">

      <aside class="bs-sidebar" id="bs-sidebar">
        <div class="bs-brand">
          <div class="bs-brand-icon">B</div>
          <div>
            <strong>Business SaaS</strong>
            <small>Business Management</small>
          </div>
          <button class="bs-close-menu" id="bs-close-menu">×</button>
        </div>

        <div class="bs-menu-label">MENU UTAMA</div>

        <nav class="bs-navigation">
          <button class="bs-nav-item active" data-page="dashboard">
            <span class="bs-nav-icon">▦</span>
            Dashboard
          </button>

          <button class="bs-nav-item" data-page="sales">
            <span class="bs-nav-icon">↗</span>
            Penjualan
            <span class="bs-soon">Soon</span>
          </button>

          <button class="bs-nav-item" data-page="inventory">
            <span class="bs-nav-icon">▤</span>
            Inventaris
            <span class="bs-soon">Soon</span>
          </button>

          <button class="bs-nav-item" data-page="customers">
            <span class="bs-nav-icon">♙</span>
            Pelanggan
            <span class="bs-soon">Soon</span>
          </button>

          <div class="bs-menu-label">MANAJEMEN</div>

          <button class="bs-nav-item" data-page="finance">
            <span class="bs-nav-icon">Rp</span>
            Keuangan
            <span class="bs-soon">Soon</span>
          </button>

          <button class="bs-nav-item" data-page="reports">
            <span class="bs-nav-icon">▥</span>
            Laporan
            <span class="bs-soon">Soon</span>
          </button>

          <button class="bs-nav-item" data-page="settings">
            <span class="bs-nav-icon">⚙</span>
            Pengaturan
            <span class="bs-soon">Soon</span>
          </button>
        </nav>

        <div class="bs-sidebar-bottom">
          <div class="bs-plan-card">
            <strong>Paket Free</strong>
            <p>Mulai kelola bisnis tanpa biaya.</p>
          </div>

          <div class="bs-user">
            <div class="bs-avatar">
              ${(user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div class="bs-user-info">
              <strong>${user?.email || "Pengunjung"}</strong>
              <small>${user ? "Pengguna" : "Belum login"}</small>
            </div>
          </div>

          ${user ? `
            <button class="bs-logout" id="bs-logout">
              Keluar dari akun
            </button>
          ` : ""}
        </div>
      </aside>

      <div class="bs-main">

        <header class="bs-header">
          <div class="bs-header-left">
            <button class="bs-menu-toggle" id="bs-menu-toggle">
              ☰
            </button>
            <div>
              <strong>Dashboard</strong>
              <small>Overview bisnis Anda</small>
            </div>
          </div>

          <div class="bs-header-right">
            <span class="bs-status">
              <span></span>
              Sistem aktif
            </span>
            <div class="bs-header-avatar">
              ${(user?.email || "U").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main class="bs-content">

          <section class="bs-welcome">
            <div>
              <span class="bs-eyebrow">BUSINESS OVERVIEW</span>
              <h1>Selamat datang${user ? "" : "!"}</h1>
              <p>
                Kelola dan pantau seluruh aktivitas bisnis
                Anda dalam satu platform.
              </p>
            </div>
          </section>

          <section class="bs-section">
            <div class="bs-section-heading">
              <div>
                <h2>Ringkasan bisnis</h2>
                <p>Informasi aktivitas bisnis Anda.</p>
              </div>
            </div>

            <div class="bs-stats">

              <article class="bs-stat-card">
                <div class="bs-stat-icon blue">Rp</div>
                <span>Total penjualan</span>
                <strong>—</strong>
                <small>Belum ada data</small>
              </article>

              <article class="bs-stat-card">
                <div class="bs-stat-icon green">↗</div>
                <span>Total transaksi</span>
                <strong>—</strong>
                <small>Belum ada data</small>
              </article>

              <article class="bs-stat-card">
                <div class="bs-stat-icon orange">▤</div>
                <span>Total produk</span>
                <strong>—</strong>
                <small>Belum ada data</small>
              </article>

              <article class="bs-stat-card">
                <div class="bs-stat-icon purple">♙</div>
                <span>Total pelanggan</span>
                <strong>—</strong>
                <small>Belum ada data</small>
              </article>

            </div>
          </section>

          <section class="bs-section">
            <div class="bs-section-heading">
              <div>
                <h2>Mulai menggunakan Business SaaS</h2>
                <p>Persiapkan ruang kerja bisnis Anda.</p>
              </div>
            </div>

            <div class="bs-onboarding">
              <div class="bs-onboarding-icon">▦</div>

              <div class="bs-onboarding-content">
                <h3>Bisnis Anda belum tersedia</h3>
                <p>
                  Buat ruang kerja bisnis untuk mulai
                  menggunakan fitur penjualan, inventaris,
                  pelanggan, dan keuangan.
                </p>

                <button class="bs-primary-button" disabled>
                  Pembuatan bisnis segera tersedia
                </button>
              </div>
            </div>
          </section>

          <footer class="bs-footer">
            Business SaaS · Platform Manajemen Bisnis
            <span>Versi pengembangan</span>
          </footer>

        </main>
      </div>
    </div>

    <div class="bs-overlay" id="bs-overlay"></div>
    <div class="bs-toast" id="bs-toast"></div>
  `;

  const sidebar = container.querySelector("#bs-sidebar");
  const overlay = container.querySelector("#bs-overlay");
  const toast = container.querySelector("#bs-toast");

  function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  container.querySelector("#bs-menu-toggle")
    .addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("show");
    });

  container.querySelector("#bs-close-menu")
    .addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);

  container.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;

      if (page === "dashboard") {
        navigate("dashboard");
        closeMenu();
        return;
      }

      toast.textContent = "Modul ini sedang dalam pengembangan.";
      toast.classList.add("show");

      closeMenu();

      setTimeout(() => toast.classList.remove("show"), 2500);
    });
  });

  const logoutButton = container.querySelector("#bs-logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await logoutUser();
      } catch (error) {
        console.error("Logout gagal:", error);
      }
    });
  }
}

registerRoute("dashboard", renderDashboard);

function initializeApp() {
  setState({ isLoading: true });

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
                                  
