/* eslint-disable import/prefer-default-export */
import { combineReducers } from "redux"
import cartReducer from "./cartReducer"
import createCardReducer from "./createCardReducer"
import deleteConfirmationReducer from "./deleteConfirmationReducer"
import {
  editCardIsOpenReducer,
  editCardGetDataReducer,
} from "./editCardReducer"
import gameReducer from "./gameReducer"
import adminReducer from "./isAdmin"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  admin: adminReducer,
  games: gameReducer,
  createCardIsOpen: createCardReducer,
  editCardData: editCardGetDataReducer,
  editCardIsOpen: editCardIsOpenReducer,
  confirmationWindowIsOpen: deleteConfirmationReducer,
})
