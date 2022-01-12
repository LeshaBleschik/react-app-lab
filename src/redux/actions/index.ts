import {
  ADD_TO_CART,
  CHANGE_AMOUNT,
  DELETE_CART,
  REMOVE_CART,
  REMOVE_USER,
  SET_USER,
} from "redux/constants"
import { signIn } from "redux/reducers/userReducer"
import store from "redux/store"
import { CartData, UserData } from "types"

type SignInAction = {
  userName: string
  password: string
}

export const setUser = (values: UserData) => ({
  type: SET_USER,
  payload: values,
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

export const deleteCart = () => ({
  type: DELETE_CART,
})

export const addToCart = (cartData: CartData) => ({
  type: ADD_TO_CART,
  payload: cartData,
})

export const removeCart = (cartData: CartData) => ({
  type: REMOVE_CART,
  payload: cartData,
})

export const changeAmount = (id: number, amount: number) => ({
  type: CHANGE_AMOUNT,
  payload: { id, amount },
})

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
