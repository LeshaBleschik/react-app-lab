import axios from "axios"
import { REGISTRATION } from "./constants"

type SignUpData = {
  regUserName: string
  regPassword: string
  regRepeatPassword: string
  isRegistrated?: string
}

const registration = async (userData: SignUpData): Promise<boolean> => {
  try {
    const response = await axios.put(REGISTRATION, userData)
    if (response.status === 200) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export default registration
