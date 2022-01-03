import React, { HTMLInputTypeAttribute } from "react"

type InputProps = {
  type?: HTMLInputTypeAttribute
  name: string
  id: string
  className?: string
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  autocomplete?: string
  maxLength?: number
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
  maxLength,
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
    maxLength={maxLength}
  />
)

Input.defaultProps = {
  type: "text",
  className: "",
  autocomplete: "off",
  onChange: false,
  value: "",
  maxLength: "",
}

export default Input
