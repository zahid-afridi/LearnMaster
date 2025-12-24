// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBen0Pz4ycGKfGOld72UikJ8XxvDDEfZf8",
  authDomain: "learnmaster-178cc.firebaseapp.com",
  projectId: "learnmaster-178cc",
  storageBucket: "learnmaster-178cc.firebasestorage.app",
  messagingSenderId: "473959474386",
  appId: "1:473959474386:web:970e7e19d568b5f7a6b90b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
