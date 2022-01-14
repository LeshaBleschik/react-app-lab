import {
  CHANGE_PASSWORD,
  REGISTRATION,
  SAVE_PROFILE,
  SIGN_IN,
} from "api/constants"
import axios from "axios"
import { REMOVE_USER, SET_USER } from "redux/constants"
import { UserAction, UserData } from "types"

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

type ModifiedUserData = {
  userName: string
  newName: string
  fields: string
}

export const userReducer = (
  // eslint-disable-next-line default-param-last
  state: null | UserData = null,
  action: UserAction
): null | UserData => {
  switch (action.type) {
    case SET_USER: {
      if (action.payload) return { ...action.payload }
      return state
    }
    case REMOVE_USER: {
      return null
    }
    default:
      return state
  }
}

export const signIn = async (userData: SignInData) => {
  try {
    const response = await axios.post(SIGN_IN, userData)
    if (response.status === 201) {
      return response
    }
    return false
  } catch {
    return false
  }
}

export const registration = async (userData: SignUpData) => {
  try {
    const response = await axios.put(REGISTRATION, userData)
    if (response.status === 200) {
      return response
    }
    return false
  } catch {
    return false
  }
}

export const changePassword = async (userData: SignInData) => {
  try {
    const response = await axios.post(CHANGE_PASSWORD, userData)
    if (response) {
      return response
    }
    return false
  } catch {
    return false
  }
}

export const saveProfile = async (userData: ModifiedUserData) => {
  try {
    const response = await axios.post(SAVE_PROFILE, userData)
    if (response) {
      return response
    }
    return false
  } catch {
    return false
  }
}
