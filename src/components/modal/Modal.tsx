import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import "./modal.scss"

type ModalProps = {
  children: JSX.Element
  confirmIsOpen?: boolean
  signInIsOpen?: boolean
  signUpIsOpen?: boolean
  passwordIsOpen?: boolean
  confirmWindowToggle?: () => void
  signInOnClose?: () => void
  signUpOnClose?: () => void
  passwordClickToggle?: () => void
}

const Modal = ({
  children,
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

  const handleClickOutside = (event: MouseEvent) => {
    if (!modalRef.current?.contains(event.target as Node) && signInIsOpen) {
      signInOnClose?.()
    }
    if (!modalRef.current?.contains(event.target as Node) && signUpIsOpen) {
      signUpOnClose?.()
    }
    if (!modalRef.current?.contains(event.target as Node) && passwordIsOpen) {
      passwordClickToggle?.()
    }
    if (!modalRef.current?.contains(event.target as Node) && confirmIsOpen) {
      confirmWindowToggle?.()
    }
  }

  const closeOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" && signInIsOpen) {
      signInOnClose?.()
    }
    if (event.key === "Escape" && signUpIsOpen) {
      signUpOnClose?.()
    }
    if (event.key === "Escape" && passwordIsOpen) {
      passwordClickToggle?.()
    }
    if (event.key === "Escape" && confirmIsOpen) {
      confirmWindowToggle?.()
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

  if (!signInIsOpen && !signUpIsOpen && !passwordIsOpen && !confirmIsOpen)
    return null

  return ReactDOM.createPortal(
    <div className="background_overlay">
      <div className="background_overlay__modal_wrapper" ref={modalRef}>
        <button
          type="button"
          className="background_overlay__close_button"
          onClick={() => {
            if (signInIsOpen) {
              signInOnClose?.()
            } else if (signUpIsOpen) {
              signUpOnClose?.()
            } else if (passwordIsOpen) {
              passwordClickToggle?.()
            } else {
              confirmWindowToggle?.()
            }
          }}
        >
          <i
            className="fas fa-times background_overlay__close_icon"
            aria-label="close button"
          />
        </button>
        {children}
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
