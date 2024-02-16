import { createUserWithEmailAndPassword as FirebaseCreateUserWithEmailAndPassword } from "firebase/auth"

import { auth } from "@/services/firebase"

export const createUserWithEmailAndPassword = ({
  email,
  password,
}: {
  email: string
  password: string
}) => FirebaseCreateUserWithEmailAndPassword(auth, email, password)
