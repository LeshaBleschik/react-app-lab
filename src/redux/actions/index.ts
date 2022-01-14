import {
  ADD_GAME_FIELDS,
  ADD_TO_CART,
  CHANGE_AMOUNT,
  CREATE_CARD_CLOSE,
  CREATE_CARD_OPEN,
  DELETE_CART,
  DELETE_CONFIRMATION_WINDOW_CLOSE,
  DELETE_CONFIRMATION_WINDOW_OPEN,
  EDIT_CARD_CLOSE,
  EDIT_CARD_OPEN,
  REMOVE_ADMIN,
  REMOVE_CART,
  REMOVE_USER,
  SET_ADMIN,
  SET_GAME,
  SET_USER,
} from "redux/constants"
import { signIn } from "redux/reducers/userReducer"
import store from "redux/store"
import { CartData, Game, GameInfo, UserData } from "types"

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

export const setAdmin = () => ({
  type: SET_ADMIN,
})

export const removeAdmin = () => ({
  type: REMOVE_ADMIN,
})

export const createCardOpen = () => ({
  type: CREATE_CARD_OPEN,
})

export const createCardClose = () => ({
  type: CREATE_CARD_CLOSE,
})

export const editCardOpen = () => ({
  type: EDIT_CARD_OPEN,
})

export const editCardClose = () => ({
  type: EDIT_CARD_CLOSE,
})

export const confirmationWindowOpen = () => ({
  type: DELETE_CONFIRMATION_WINDOW_OPEN,
})

export const confirmationWindowClose = () => ({
  type: DELETE_CONFIRMATION_WINDOW_CLOSE,
})

export const setGame = (game: Game[]) => ({
  type: SET_GAME,
  payload: game,
})

export const addGameInfo = (gameInfo: GameInfo) => ({
  type: ADD_GAME_FIELDS,
  payload: gameInfo,
})

export async function singInAction(userData: SignInAction) {
  const response = await signIn(userData)
  if (response) {
    if (userData.userName.toLowerCase() === "admin") {
      store.dispatch(setAdmin())
    }
    const userToken = response.data.tokens[0]
    localStorage.setItem("userToken", JSON.stringify(userToken))
    store.dispatch(setUser(response.data))
    return true
  }
  return false
}
