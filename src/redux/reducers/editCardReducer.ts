import { PRODUCTS_SEARCH } from "api/constants"
import axios from "axios"
import {
  ADD_GAME_FIELDS,
  EDIT_CARD_CLOSE,
  EDIT_CARD_OPEN,
} from "redux/constants"
import { Action, Card, GameInfo } from "types"

type EditCardAction = {
  type: string
  payload: GameInfo
}

type EditCard = Omit<Card, "rating">

export const editCardGetDataReducer = (
  // eslint-disable-next-line default-param-last
  state = null,
  action: EditCardAction
) => {
  switch (action.type) {
    case ADD_GAME_FIELDS: {
      return action.payload
    }
    default:
      return state
  }
}

export const editCardIsOpenReducer = (
  // eslint-disable-next-line default-param-last
  state = false,
  action: Action
): boolean => {
  switch (action?.type) {
    case EDIT_CARD_OPEN: {
      return true
    }
    case EDIT_CARD_CLOSE: {
      return false
    }
    default:
      return state
  }
}

export const editCard = async (card: EditCard) => {
  try {
    const response = await axios.put(PRODUCTS_SEARCH, card)
    if (response.status === 200) {
      return response
    }
    return false
  } catch {
    return false
  }
}
