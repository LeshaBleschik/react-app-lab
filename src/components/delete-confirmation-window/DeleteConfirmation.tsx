import { PRODUCTS_SEARCH } from "api/constants"
import Button from "elements/button/Button"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { confirmationWindowClose, editCardOpen, setGame } from "redux/actions"
import { deleteCard } from "redux/reducers/deleteConfirmationReducer"
import { getEditCardDataSelector } from "redux/selectors"
import "./delete-confirmation.scss"

const DeleteConfirmation = () => {
  const gameInfo = useSelector(getEditCardDataSelector)
  const dispatch = useDispatch()

  const rejectClickHandler = () => {
    dispatch(editCardOpen())
    dispatch(confirmationWindowClose())
  }

  const confirmClickHandler = async () => {
    const response = await deleteCard(`${PRODUCTS_SEARCH}/${gameInfo.id}`)
    if (response) {
      dispatch(confirmationWindowClose())
      dispatch(setGame(response.data))
      alert("The game was successfully deleted")
    }
  }

  return (
    <div className="confirmation_window">
      <h3 className="confirmation_window__title">
        Are you sure you want to delete the product {gameInfo.name}?
      </h3>
      <div className="confirmation_window__buttons_group">
        <Button title="Yes" onClick={confirmClickHandler} />
        <Button title="No" onClick={rejectClickHandler} />
      </div>
    </div>
  )
}

export default DeleteConfirmation
