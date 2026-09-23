import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, orderBy, query, doc, deleteDoc, updateDoc, enableIndexedDbPersistence, arrayUnion, limit, startAfter, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCET2TwwlGUaKNIRMT-MP4jBasgIOeZ7C8",
  authDomain: "itepwebsite-ru26-30.firebaseapp.com",
  projectId: "itepwebsite-ru26-30",
  storageBucket: "itepwebsite-ru26-30.firebasestorage.app",
  messagingSenderId: "796839034545",
  appId: "1:796839034545:web:cc99ecb6c98528e1f2ec90",
  measurementId: "G-FG1PHGYYT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    console.warn("Firestore persistence error", err);
});

// Utility for XSS prevention
const escapeHTML = (str) => {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
};

export { auth, db, onAuthStateChanged, signInWithEmailAndPassword, signOut, collection, addDoc, getDocs, getDoc, orderBy, query, doc, deleteDoc, updateDoc, arrayUnion, escapeHTML, limit, startAfter, where };
