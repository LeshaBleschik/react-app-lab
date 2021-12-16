import React, { useState, useEffect } from "react"
import "./registration.scss"
import { useNavigate } from "react-router"
import Button from "elements/button/Button"
import Input from "elements/input/Input"
import registration from "api/registration"
import { User } from "types"

type SignUpData = {
  userName: string
  password: string
  repeatPassword: string
  isRegistrated?: string
}

type SignUpErrors = SignUpData | null

type SignUpProps = {
  signUpOnClose: () => void
  logInSetter: () => void
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const Registration = ({ signUpOnClose, logInSetter, setUser }: SignUpProps) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<SignUpData>({
    userName: "",
    password: "",
    repeatPassword: "",
  })
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState<SignUpErrors>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const toggleClickHandler = (
    fn: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    fn(!value)
  }

  const validation = (inputValues: SignUpData) => {
    const passwordRegEx = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g
    const errorsObj = { userName: "", password: "", repeatPassword: "" }
    if (!inputValues.userName.length) {
      errorsObj.userName = "The field can't be empty!"
    } else if (inputValues.userName.length < 4) {
      errorsObj.userName = "At least 4 characters are required!"
    }
    if (!inputValues.password) {
      errorsObj.password = "The field can't be empty!"
    } else if (!passwordRegEx.test(inputValues.password)) {
      errorsObj.password =
        "Passwords must contain at least 6 symbols, one capitalized letter and one number"
    } else if (inputValues.password !== inputValues.repeatPassword) {
      errorsObj.password =
        "The passwords aren't the same! Make sure they have same values."
    }
    return errorsObj
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copiedData: SignUpData = { ...userData }
    const id = event.target.id as "userName" | "password" | "repeatPassword"
    copiedData[id] = event.target.value
    setUserData(copiedData)
    setErrors(validation(copiedData))
  }

  useEffect(() => {
    setIsError(
      !!errors?.userName || !!errors?.password || !!errors?.repeatPassword
    )
  }, [errors])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isError) {
      const resetUserData: SignUpData = {
        userName: "",
        password: "",
        repeatPassword: "",
      }
      setUserData(resetUserData)
    } else {
      const response = await registration(userData)
      if (response) {
        logInSetter()
        setUser({ ...userData })
        navigate("/profile", { replace: true })
        signUpOnClose()
      } else {
        const registrationError = {
          userName: "",
          password: "",
          repeatPassword: "",
          isRegistrated: "Current user already exists! Try to sign in.",
        }
        setErrors(registrationError)
      }
    }
  }

  return (
    <form className="registration_form" onSubmit={submit}>
      <h2 className="registration_form__title">Registration</h2>
      {errors?.isRegistrated ? (
        <p className="registration_form__error">{errors.isRegistrated}</p>
      ) : (
        <div className="registration_form__transparrent" />
      )}
      <label htmlFor="userName">Login:</label>
      <Input
        type="text"
        name="userName"
        id="userName"
        className="registration_form__input"
        placeholder="Name:"
        onChange={handleChange}
        value={userData.userName}
        autocomplete="off"
      />
      {errors?.userName ? (
        <p className="registration_form__error">{errors.userName}</p>
      ) : (
        <div className="registration_form__transparrent" />
      )}
      <label htmlFor="password" className="registration_form__label">
        Password:
      </label>
      <div className="registration_form__input_field">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          className="registration_form__input_inside"
          placeholder="Password:"
          onChange={handleChange}
          value={userData.password}
        />
        {userData.password && (
          <button
            type="button"
            onClick={() => toggleClickHandler(setShowPassword, showPassword)}
            className="reset"
          >
            <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"} />
          </button>
        )}
      </div>
      <label
        htmlFor="repeatPassword"
        className="registration_form__label_repeat"
      >
        Repeat password:
      </label>
      <div className="registration_form__input_field">
        <Input
          type={showRepeatPassword ? "text" : "password"}
          name="repeatPassword"
          id="repeatPassword"
          className="registration_form__input_inside"
          placeholder="Repeat password:"
          onChange={handleChange}
          value={userData.repeatPassword}
        />
        {userData.repeatPassword && (
          <button
            type="button"
            onClick={() =>
              toggleClickHandler(setShowRepeatPassword, showRepeatPassword)
            }
            className="reset"
          >
            <i
              className={showRepeatPassword ? "far fa-eye-slash" : "far fa-eye"}
            />
          </button>
        )}
      </div>
      {errors?.password ? (
        <p className="registration_form__error">{errors.password}</p>
      ) : (
        <div className="registration_form__transparrent" />
      )}
      <Button
        className="registration_form__submit"
        title="Submit"
        type="submit"
      />
    </form>
  )
}

export default Registration
