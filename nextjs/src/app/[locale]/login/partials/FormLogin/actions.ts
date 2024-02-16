import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

import {
  auth,
  githubProvider,
  googleProvider,
  microsoftProvider,
} from "@/services/firebase"

export const loginWithEmailAndPassword = ({
  email,
  password,
}: {
  email: string
  password: string
}) => signInWithEmailAndPassword(auth, email, password)

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider)
export const loginWithMicrosoft = () => signInWithPopup(auth, microsoftProvider)
export const loginWithGithub = () => signInWithPopup(auth, githubProvider)
