
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
e.preventDefault();
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    alert("Login berhasil!");
        window.location.href = "homepage.html";
    })
    .catch((error) => {
    alert("Login gagal: " + error.message);
    });
});

// Register
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Password tidak sama bro.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password minimal 6 karakter bro.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Auto kasih saldo $1000
      await setDoc(doc(db, "users", user.uid), {
        balance: 1000
      });
  
      alert("Registrasi berhasil!");
      window.location.href = "homepage.html";
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert("Password lo terlalu gampang bro. Coba pake kombinasi huruf dan angka.");
      } else {
        alert("Registrasi gagal: " + error.message);
      }
      console.error("Firebase Error:", error);
    }
  });