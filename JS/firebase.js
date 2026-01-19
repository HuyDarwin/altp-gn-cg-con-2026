// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg74wlNTFsuvpnu_sD3oqieZrLx2D0res",
  authDomain: "wwtbam-huydarwin-controller.firebaseapp.com",
  databaseURL: "https://wwtbam-huydarwin-controller-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wwtbam-huydarwin-controller",
  storageBucket: "wwtbam-huydarwin-controller.firebasestorage.app",
  messagingSenderId: "232833819877",
  appId: "1:232833819877:web:7fe1c01dfc4c6e24e2a00c",
  measurementId: "G-CNTGNJL6Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);