import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

import { auth, githubProvider, googleProvider, microsoftProvider } from "@/services/firebase"

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
  } catch (error: any) {}
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
