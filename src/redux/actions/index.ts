import { REMOVE_USER, SET_USER } from "redux/constants"
import { signIn } from "redux/reducers/userReducer"
import store from "redux/store"
import { UserPayload } from "types"

type SignInAction = {
  userName: string
  password: string
}

export const setUser = (values: UserPayload) => ({
  type: SET_USER,
  payload: values,
})

export function removeUser() {
  return {
    type: REMOVE_USER,
  }
}

export async function singInAction(userData: SignInAction) {
  const response = await signIn(userData)
  if (response) {
    const userToken = response.data.tokens[0]
    localStorage.setItem("userToken", JSON.stringify(userToken))
    store.dispatch(setUser(response.data))
    return true
  }
  return false
}
