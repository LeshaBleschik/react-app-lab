import { RootStateOrAny } from "react-redux"

export const getUserSelector = (state: RootStateOrAny) => state.user
export const getCartSelector = (state: RootStateOrAny) => state.cart
export const getAdminSelector = (state: RootStateOrAny) => state.admin
export const getGameSelector = (state: RootStateOrAny) => state.games
export const getCreateCardSelector = (state: RootStateOrAny) =>
  state.createCardIsOpen
export const getEditCardDataSelector = (state: RootStateOrAny) =>
  state.editCardData
export const getEditCardSelector = (state: RootStateOrAny) =>
  state.editCardIsOpen
export const getConfirmationWindowSelector = (state: RootStateOrAny) =>
  state.confirmationWindowIsOpen
