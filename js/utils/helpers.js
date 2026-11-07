
// Mengamankan teks sebelum dimasukkan ke HTML
export function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };

  return String(value ?? "").replace(
    /[&<>"']/g,
    (character) => characters[character]
  );
}

// Membatasi panjang teks
export function truncateText(value, maxLength = 50) {
  const text = String(value ?? "");

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trimEnd() + "...";
}

// Menunda eksekusi fungsi sampai aktivitas berhenti
export function debounce(callback, delay = 300) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

// Mengambil elemen HTML
export function getElement(selector, parent = document) {
  const element = parent.querySelector(selector);

  if (!element) {
    throw new Error(`Elemen tidak ditemukan: ${selector}`);
  }

  return element;
}

// Memeriksa apakah nilai merupakan objek biasa
export function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}
