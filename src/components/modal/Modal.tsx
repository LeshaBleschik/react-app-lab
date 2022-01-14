import ChangePassword from "components/change-password/ChangePassword"
import ConfirmMesage from "components/confirm-modal/ConfirmMesage"
import CreateCard from "components/create-new-card/CreateCard"
import DeleteConfirmation from "components/delete-confirmation-window/DeleteConfirmation"
import EditCard from "components/edit-card/EditCard"
import Registration from "components/registration/Registration"
import SignIn from "components/sign-in/SignIn"
import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  confirmationWindowClose,
  createCardClose,
  editCardClose,
} from "redux/actions"
import {
  getConfirmationWindowSelector,
  getCreateCardSelector,
  getEditCardSelector,
} from "redux/selectors"
import "./modal.scss"

type ModalProps = {
  confirmIsOpen: boolean
  signInIsOpen: boolean
  signUpIsOpen: boolean
  passwordIsOpen: boolean
  confirmWindowToggle: () => void
  signInOnClose: () => void
  signUpOnClose: () => void
  passwordClickToggle: () => void
}

const Modal = ({
  signInIsOpen,
  confirmIsOpen,
  confirmWindowToggle,
  signInOnClose,
  signUpIsOpen,
  signUpOnClose,
  passwordClickToggle,
  passwordIsOpen,
}: ModalProps) => {
  const portal = document.getElementById("portal") as HTMLElement
  const modalRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const createCardIsOpen = useSelector(getCreateCardSelector)
  const editCardIsOpen = useSelector(getEditCardSelector)
  const confirmationWindowIsOpen = useSelector(getConfirmationWindowSelector)
  const dispatch = useDispatch()

  const handleClickOutside = (event: MouseEvent) => {
    if (!modalRef.current?.contains(event.target as Node)) {
      if (signInIsOpen) signInOnClose?.()
      if (signUpIsOpen) signUpOnClose?.()
      if (passwordIsOpen) passwordClickToggle?.()
      if (confirmIsOpen) confirmWindowToggle?.()
      if (createCardIsOpen) dispatch(createCardClose())
      if (editCardIsOpen) dispatch(editCardClose())
      if (confirmationWindowIsOpen) dispatch(confirmationWindowClose())
    }
  }

  const closeOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      if (signInIsOpen) signInOnClose?.()
      if (signUpIsOpen) signUpOnClose?.()
      if (passwordIsOpen) passwordClickToggle?.()
      if (confirmIsOpen) confirmWindowToggle?.()
      if (createCardIsOpen) dispatch(createCardClose())
      if (editCardIsOpen) dispatch(editCardClose())
      if (confirmationWindowIsOpen) dispatch(confirmationWindowClose())
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", closeOnKeyPress)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", closeOnKeyPress)
    }
  })

  if (
    !signInIsOpen &&
    !signUpIsOpen &&
    !passwordIsOpen &&
    !confirmIsOpen &&
    !createCardIsOpen &&
    !editCardIsOpen &&
    !confirmationWindowIsOpen
  )
    return null

  return ReactDOM.createPortal(
    <div className="background_overlay">
      <div className="background_overlay__modal_wrapper" ref={modalRef}>
        <button
          type="button"
          className="background_overlay__close_button"
          onClick={() => {
            if (signInIsOpen) signInOnClose?.()
            if (signUpIsOpen) signUpOnClose?.()
            if (passwordIsOpen) passwordClickToggle?.()
            if (createCardIsOpen) dispatch(createCardClose())
            if (editCardIsOpen) dispatch(editCardClose())
            if (confirmationWindowIsOpen) dispatch(confirmationWindowClose())
            if (confirmIsOpen) confirmWindowToggle?.()
          }}
        >
          <i
            className="fas fa-times background_overlay__close_icon"
            aria-label="close button"
          />
        </button>
        {signInIsOpen ? <SignIn signInOnClose={signInOnClose} /> : null}
        {signUpIsOpen ? <Registration signUpOnClose={signUpOnClose} /> : null}
        {passwordIsOpen ? (
          <ChangePassword passwordClickToggle={passwordClickToggle} />
        ) : null}
        {confirmIsOpen ? <ConfirmMesage /> : null}
        {createCardIsOpen ? <CreateCard /> : null}
        {editCardIsOpen ? <EditCard /> : null}
        {confirmationWindowIsOpen ? <DeleteConfirmation /> : null}
      </div>
    </div>,
    portal
  )
}

Modal.defaultProps = {
  singInIsVisible: null,
  singUpIsVisible: null,
  passwordIsOpen: null,
  signInOnClose: () => false,
  signUpOnClose: () => false,
  passwordClickToggle: () => false,
}

export default Modal
