import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBDvyznxH41s9Fc9Nzr4nt5LQR7kCcYF1g",
  authDomain: "taskmng-219b5.firebaseapp.com",
  projectId: "taskmng-219b5",
  storageBucket: "taskmng-219b5.appspot.com",
  messagingSenderId: "820762482473",
  appId: "1:820762482473:web:8b70a6c4acea7a82e60938",
  measurementId: "G-1YFS6V1XPP"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()