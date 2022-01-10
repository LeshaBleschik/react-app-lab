/* eslint-disable import/prefer-default-export */
import { combineReducers } from "redux"
import userCartReducer from "./userCart"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
  user: userReducer,
  cart: userCartReducer,
})
