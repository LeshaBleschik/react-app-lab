import React, { HTMLInputTypeAttribute } from "react"

type InputProps = {
  type?: HTMLInputTypeAttribute
  name: string
  id: string
  className?: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  autocomplete?: string
}
const Input = ({
  type = "text",
  name,
  id,
  className,
  placeholder,
  onChange,
  value,
  autocomplete,
}: InputProps) => (
  <input
    type={type}
    name={name}
    id={id}
    className={className}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    autoComplete={autocomplete}
  />
)

Input.defaultProps = {
  type: "text",
  className: "",
  autocomplete: "off",
}

export default Input
