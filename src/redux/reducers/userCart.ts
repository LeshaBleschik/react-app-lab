import {
  ADD_TO_CART,
  CHANGE_AMOUNT,
  DELETE_CART,
  REMOVE_CART,
} from "redux/constants"
import { CartData } from "types"

type UserCartAction = {
  type: string
  payload: {
    id: number
    name: string
    platform: string[]
    price: number
    amount: number
  }
}

type CartState = CartData[] | null

const initialState: CartState = null

// eslint-disable-next-line default-param-last
export default function userCart(state = initialState, action: UserCartAction) {
  switch (action.type) {
    case ADD_TO_CART: {
      if (state) {
        return [...state, action.payload]
      }
      return [action.payload]
    }
    case REMOVE_CART: {
      if (state) {
        return [
          ...state.filter((cart: CartData) => cart.id !== action.payload.id),
        ]
      }
      return state
    }
    case CHANGE_AMOUNT: {
      return state?.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, amount: action.payload.amount }
        }
        return item
      })
    }
    case DELETE_CART: {
      return null
    }
    default:
      return state
  }
}
