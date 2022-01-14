import React from "react"
import "./button.scss"

type ButtonProps = {
  className?: string
  title: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  onClick?: () => void
}

const Button = ({
  className,
  title,
  type = "button",
  onClick,
}: ButtonProps) => (
  <button
    className={`button_default ${className}`}
    type={type}
    onClick={onClick}
  >
    {title}
  </button>
)

Button.defaultProps = {
  type: "button",
  onClick: () => false,
  className: "",
}

export default Button
