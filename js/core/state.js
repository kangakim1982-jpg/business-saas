
const initialState = {
  user: null,
  activeBusiness: null,
  currentPage: "dashboard",
  isLoading: false,
  isInitialized: false
};

let state = { ...initialState };

const listeners = new Set();

// Mengambil seluruh status aplikasi
export function getState() {
  return { ...state };
}

// Mengubah status aplikasi
export function setState(updates) {
  const previousState = { ...state };

  state = {
    ...state,
    ...updates
  };

  listeners.forEach((listener) => {
    listener({ ...state }, previousState);
  });
}

// Mendengarkan perubahan status
export function subscribe(listener) {
  if (typeof listener !== "function") {
    throw new TypeError("Listener harus berupa fungsi.");
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

// Mengembalikan status ke kondisi awal
export function resetState() {
  setState({ ...initialState });
}
