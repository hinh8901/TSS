import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, OAuthProvider, GithubAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBDvyznxH41s9Fc9Nzr4nt5LQR7kCcYF1g",
  authDomain: "taskmng-219b5.firebaseapp.com",
  projectId: "taskmng-219b5",
  storageBucket: "taskmng-219b5.appspot.com",
  messagingSenderId: "820762482473",
  appId: "1:820762482473:web:8b70a6c4acea7a82e60938",
  measurementId: "G-1YFS6V1XPP",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
auth.useDeviceLanguage()

export const googleProvider = new GoogleAuthProvider()
// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const microsoftProvider = new OAuthProvider("microsoft.com")
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "common",
})

export const githubProvider = new GithubAuthProvider()
githubProvider.setCustomParameters({
  "allow_signup": "true"
})

export const fireStoreDB = getFirestore(app)
