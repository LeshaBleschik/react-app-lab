import { SET_GAME } from "redux/constants"
import { Game } from "types"

type GameAction = {
  type: string
  payload: Game[]
}

const gameReducer = (
  // eslint-disable-next-line default-param-last
  state: null | Game[] = null,
  action: GameAction
): null | Game[] => {
  switch (action.type) {
    case SET_GAME: {
      return action.payload
    }
    default:
      return state
  }
}

export default gameReducer
