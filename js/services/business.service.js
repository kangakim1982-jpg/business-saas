
import { db } from "../config/firebase.js";
import { auth } from "../config/firebase.js";

import {
  doc,
  collection,
  writeBatch,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

import { isRequired } from "../core/validators.js";

// Membuat bisnis baru
export async function createBusiness(businessName) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Pengguna belum login.");
  }

  if (!isRequired(businessName)) {
    throw new Error("Nama bisnis wajib diisi.");
  }

  const name = businessName.trim();

  if (name.length > 100) {
    throw new Error("Nama bisnis maksimal 100 karakter.");
  }

  const businessRef = doc(collection(db, "businesses"));
  const memberRef = doc(
    db,
    "businesses",
    businessRef.id,
    "members",
    user.uid
  );

  const batch = writeBatch(db);

  batch.set(businessRef, {
    name,
    ownerId: user.uid,
    status: "active",
    plan: "free",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  batch.set(memberRef, {
    userId: user.uid,
    role: "owner",
    status: "active",
    joinedAt: serverTimestamp()
  });

  await batch.commit();

  return businessRef.id;
}

// Mengambil informasi bisnis
export async function getBusiness(businessId) {
  if (!isRequired(businessId)) {
    throw new Error("ID bisnis tidak valid.");
  }

  const businessRef = doc(db, "businesses", businessId);
  const snapshot = await getDoc(businessRef);

  if (!snapshot.exists()) {
    throw new Error("Bisnis tidak ditemukan.");
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}
