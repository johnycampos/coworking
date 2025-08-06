// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByvugN6F_eVbarxBjzRU21R1xgayWR7fM",
  authDomain: "coworking-juridico.firebaseapp.com",
  projectId: "coworking-juridico",
  storageBucket: "coworking-juridico.firebasestorage.app",
  messagingSenderId: "583989096553",
  appId: "1:583989096553:web:3225391a4124ea8e31b2f8",
  measurementId: "G-EZX42JP38V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics }; 