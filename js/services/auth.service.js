
import { auth } from "../config/firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// Mendaftarkan akun baru
export async function registerUser(email, password) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return credential.user;
}

// Login pengguna
export async function loginUser(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return credential.user;
}

// Logout pengguna
export async function logoutUser() {
  await signOut(auth);
}

// Memantau perubahan status login
export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

// Mengirim email pemulihan password
export async function resetUserPassword(email) {
  await sendPasswordResetEmail(auth, email.trim());
}
