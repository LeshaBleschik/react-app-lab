import { REMOVE_ADMIN, SET_ADMIN } from "redux/constants"

type AdminAction = {
  type: string
}

const adminReducer = (
  // eslint-disable-next-line default-param-last
  state = false,
  action: AdminAction
): boolean => {
  switch (action?.type) {
    case SET_ADMIN: {
      return true
    }
    case REMOVE_ADMIN: {
      return false
    }
    default:
      return state
  }
}

export default adminReducer
