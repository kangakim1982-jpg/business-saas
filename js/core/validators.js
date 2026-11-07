
export function isRequired(value) {
  return value !== null &&
    value !== undefined &&
    String(value).trim() !== "";
}

export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email).trim());
}

export function minLength(value, min) {
  return String(value).length >= min;
}

export function maxLength(value, max) {
  return String(value).length <= max;
}

export function isValidNumber(value) {
  return value !== "" &&
    value !== null &&
    value !== undefined &&
    Number.isFinite(Number(value));
}

export function isPositiveNumber(value) {
  return isValidNumber(value) && Number(value) > 0;
}

export function isNonNegativeNumber(value) {
  return isValidNumber(value) && Number(value) >= 0;
}

export function isValidPassword(password) {
  return typeof password === "string" &&
    password.length >= 8;
}

// Memeriksa beberapa aturan sekaligus
export function validate(data, rules) {
  const errors = {};

  for (const field in rules) {
    const value = data[field];
    const fieldRules = rules[field];

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        errors[field] = rule.message;
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
