import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { addDoc, collection, getDocs, doc } from "firebase/firestore"

import { auth, fireStoreDB, githubProvider, googleProvider, microsoftProvider } from "@/services/firebase"

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (error: any) {
    switch (error?.code) {
      case "auth/network-request-failed":
        return "networkRequestFailed"

      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "emailPassIncorrect"

      case "auth/user-disabled":
        return "userDisabled"

      case "auth/too-many-requests":
        return "tooManyRequests"

      default:
        return {
          message: "errOccur",
          errCode: error?.code,
        }
    }
  }
}

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
  } catch (error: any) {
    console.log(Object.keys(error), Object.values(error))
  }
}

export const loginWithMicrosoft = async () => {
  try {
    const res = await signInWithPopup(auth, microsoftProvider)
  } catch (error: any) {
    console.log(Object.keys(error), Object.values(error))
  }
}

export const loginWithGithub = async () => {
  try {
    const res = signInWithPopup(auth, githubProvider)
  } catch (error: any) {
    console.log(Object.keys(error), Object.values(error))
  }
}

export const addDataEx = async () => {
  try {
    const docRef = await addDoc(collection(fireStoreDB, "users"), {
      firest: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error: any) {
    console.log(Object.keys(error), Object.values(error))
  }
}

export const getDataEx = async () => {
  const querySnapshot = await getDocs(collection(fireStoreDB, "users"))

  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data())
  })
}

export const getLocationEx = async () => {
  const location = doc(fireStoreDB, "users", "aturing")
  console.log(location)
}