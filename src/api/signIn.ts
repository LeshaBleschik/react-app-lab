import axios from "axios"
import { SIGN_IN } from "./constants"

type SignInData = {
  userName: string
  password: string
  signInError?: string
}

const signIn = async (userData: SignInData): Promise<boolean> => {
  try {
    const response = await axios.post(SIGN_IN, userData)
    if (response.status === 201) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export default signIn
