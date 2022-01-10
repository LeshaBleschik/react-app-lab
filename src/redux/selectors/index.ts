import { RootStateOrAny } from "react-redux"

export const getUserSelector = (state: RootStateOrAny) => state.user
export const getCartSelector = (state: RootStateOrAny) => state.cart
