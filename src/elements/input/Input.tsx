import React, { HTMLInputTypeAttribute } from "react"

type InputProps = {
  type?: HTMLInputTypeAttribute
  name?: string
  id?: string
  className?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  autocomplete?: string
  maxLength?: number
  min?: number
  max?: number
  defaultChecked?: boolean
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
  min,
  max,
  defaultChecked,
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
    min={min}
    max={max}
    defaultChecked={defaultChecked}
  />
)

Input.defaultProps = {
  type: "text",
  className: "",
  autocomplete: "off",
  onChange: false,
  value: "",
  maxLength: "",
  name: "",
  id: "",
  placeholder: "",
  min: 0,
  max: 0,
  defaultChecked: false,
}

export default Input
