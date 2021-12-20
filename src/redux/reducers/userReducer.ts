import { REGISTRATION, SIGN_IN } from "api/constants"
import axios from "axios"

type UserAction = {
  type: string
  payload?: string
}

type SignUpData = {
  regUserName: string
  regPassword: string
  regRepeatPassword: string
  isRegistrated?: string
}

type SignInData = {
  userName: string
  password: string
  signInError?: string
}

// eslint-disable-next-line default-param-last
export const userReducer = (state = null, action: UserAction) => {
  switch (action.type) {
    case "SET_USER": {
      return { userName: action.payload }
    }
    case "REMOVE_USER": {
      return null
    }
    default:
      return state
  }
}

export const signIn = () => async (userData: SignInData) => {
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

export const registration = () => async (userData: SignUpData) => {
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
