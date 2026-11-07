
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkmVjJhx--c8oam1wnAmtMyBJ2wgLnItY",
  authDomain: "business-saas-ce90e.firebaseapp.com",
  projectId: "business-saas-ce90e",
  storageBucket: "business-saas-ce90e.firebasestorage.app",
  messagingSenderId: "187249257242",
  appId: "1:187249257242:web:c4ba20e7463778e5d61aa3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
