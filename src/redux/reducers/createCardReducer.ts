import { PRODUCTS_SEARCH } from "api/constants"
import axios from "axios"
import { CREATE_CARD_CLOSE, CREATE_CARD_OPEN } from "redux/constants"
import { Action } from "types"

type Card = {
  title: string
  image: string
  price: string
  description: string
  age: string
  rating: string
  genre: string
  category: string[]
}

const createCardReducer = (
  // eslint-disable-next-line default-param-last
  state = false,
  action: Action
): boolean => {
  switch (action?.type) {
    case CREATE_CARD_OPEN: {
      return true
    }
    case CREATE_CARD_CLOSE: {
      return false
    }
    default:
      return state
  }
}

export const createCard = async (card: Card) => {
  try {
    const response = await axios.post(PRODUCTS_SEARCH, card)
    if (response.status === 200) {
      return response
    }
    return false
  } catch {
    return false
  }
}

export default createCardReducer
