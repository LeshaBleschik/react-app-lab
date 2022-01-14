import axios from "axios"
import {
  DELETE_CONFIRMATION_WINDOW_CLOSE,
  DELETE_CONFIRMATION_WINDOW_OPEN,
} from "redux/constants"
import { Action } from "types"

const deleteConfirmationReducer = (
  // eslint-disable-next-line default-param-last
  state = false,
  action: Action
): boolean => {
  switch (action?.type) {
    case DELETE_CONFIRMATION_WINDOW_OPEN: {
      return true
    }
    case DELETE_CONFIRMATION_WINDOW_CLOSE: {
      return false
    }
    default:
      return state
  }
}

export const deleteCard = async (url: string) => {
  try {
    const response = await axios.delete(url)
    if (response.status === 200) {
      return response
    }
    return false
  } catch {
    return false
  }
}

export default deleteConfirmationReducer
