import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

import { auth, googleProvider } from "@/services/firebase"

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (error: any) {
    console.log("ERROR", error)
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
    console.log("login to google")
    const res = await signInWithPopup(auth, googleProvider)
  } catch (error: any) {

  }
}
