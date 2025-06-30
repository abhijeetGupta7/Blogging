// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-cd16d.firebaseapp.com",
  projectId: "mern-blog-cd16d",
  storageBucket: "mern-blog-cd16d.firebasestorage.app",
  messagingSenderId: "92490972200",
  appId: "1:92490972200:web:81ffd9e888ece838d3c91d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export { auth, provider };

