
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

// Format mata uang Rupiah
export function formatCurrency(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Rp0";
  }

  return currencyFormatter.format(number);
}

// Format angka
export function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return new Intl.NumberFormat("id-ID").format(number);
}

// Format tanggal
export function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  }).format(date);
}

// Format tanggal dan waktu
export function formatDateTime(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta"
  }).format(date);
}

// Format persentase
export function formatPercent(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0%";
  }

  return `${number.toLocaleString("id-ID")}%`;
}
