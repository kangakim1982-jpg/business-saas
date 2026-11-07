
const events = new Map();

// Mendaftarkan event
export function on(eventName, callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback harus berupa fungsi.");
  }

  if (!events.has(eventName)) {
    events.set(eventName, new Set());
  }

  events.get(eventName).add(callback);

  // Mengembalikan fungsi untuk berhenti berlangganan
  return () => {
    off(eventName, callback);
  };
}

// Menjalankan event
export function emit(eventName, data = null) {
  const callbacks = events.get(eventName);

  if (!callbacks) return;

  callbacks.forEach((callback) => {
    try {
      callback(data);
    } catch (error) {
      console.error(`Error pada event "${eventName}":`, error);
    }
  });
}

// Menghapus event tertentu
export function off(eventName, callback) {
  const callbacks = events.get(eventName);

  if (!callbacks) return;

  callbacks.delete(callback);

  if (callbacks.size === 0) {
    events.delete(eventName);
  }
}

// Menghapus seluruh listener suatu event
export function removeAll(eventName) {
  events.delete(eventName);
}
