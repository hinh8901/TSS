import { createUserWithEmailAndPassword as FirebaseCreateUserWithEmailAndPassword } from "firebase/auth"

import { auth } from "@/services/firebase"

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await FirebaseCreateUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return res
  } catch (error: any) {
    switch (error?.code) {
      case "auth/email-already-in-use":
        return "emailInUse"

      case "auth/invalid-email":
        return "emailInvalid"

      case "auth/operation-not-allowed":
        return "operationNotAllowed"

      case "auth/weak-password":
        return "passwordWeak"

      default:
        return {
          message: "errOccur",
          errCode: error?.code,
        }
    }
  }
}
