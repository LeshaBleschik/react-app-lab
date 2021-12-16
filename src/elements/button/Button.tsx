import React from "react"
import "./button.scss"

type ButtonProps = {
  className: string
  title: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const Button = ({ className, title, type = "button" }: ButtonProps) => (
  <button className={`button_default ${className}`} type={type}>
    {title}
  </button>
)

Button.defaultProps = {
  type: "button",
}

export default Button
