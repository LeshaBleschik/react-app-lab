import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import "./modal.scss"

type ModalProps = {
  children: JSX.Element
  singInIsVisible?: boolean
  singUpIsVisible?: boolean
  signInOnClose?: () => void
  signUpOnClose?: () => void
}

const Modal = ({
  children,
  singInIsVisible,
  signInOnClose,
  singUpIsVisible,
  signUpOnClose,
}: ModalProps) => {
  const portal = document.getElementById("portal") as HTMLElement
  const modalRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleClickOutside = (event: MouseEvent) => {
    if (!modalRef.current?.contains(event.target as Node) && singInIsVisible) {
      signInOnClose?.()
    }
    if (!modalRef.current?.contains(event.target as Node) && singUpIsVisible) {
      signUpOnClose?.()
    }
  }

  const closeOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape" && singInIsVisible) {
      signInOnClose?.()
    }
    if (event.key === "Escape" && singUpIsVisible) {
      signUpOnClose?.()
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

  if (!singInIsVisible && !singUpIsVisible) return null

  return ReactDOM.createPortal(
    <div className="background_overlay">
      <div className="background_overlay__modal_wrapper" ref={modalRef}>
        <button
          type="button"
          className="background_overlay__close_button"
          onClick={() => {
            if (singInIsVisible) {
              signInOnClose?.()
            } else {
              signUpOnClose?.()
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
  signInOnClose: () => false,
  signUpOnClose: () => false,
}

export default Modal