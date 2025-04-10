import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsX7MZcq37LGFesTD-imVamhA2cUU-QvI",
  authDomain: "dbryhub.firebaseapp.com",
  projectId: "dbryhub",
  storageBucket: "dbryhub.firebasestorage.app",
  messagingSenderId: "60161092458",
  appId: "1:60161092458:web:2b7de7260853b9e913d313",
  measurementId: "G-771XGZ73P9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const balanceEl = document.getElementById("balance");
const profileInfo = document.getElementById("profile-info");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    profileInfo.textContent = user.email;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      balanceEl.textContent = "$" + docSnap.data().balance.toFixed(2);
    } else {
      balanceEl.textContent = "No data";
    }
  } else {
    window.location.href = "login.html";
  }
});

function logout() {
  signOut(auth).then(() => window.location.href = "login.html");
}