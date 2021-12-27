import React, { useState, useEffect } from "react"
import "./registration.scss"
import { useNavigate } from "react-router"
import Button from "elements/button/Button"
import Input from "elements/input/Input"
import { registration } from "redux/reducers/userReducer"
import { singInAction } from "redux/actions"

type SignUpData = {
  regUserName: string
  regPassword: string
  regRepeatPassword: string
  isRegistrated?: string
}

type SignUpErrors = SignUpData | null

type RegistrationProps = {
  signUpOnClose: () => void
}

const Registration = ({ signUpOnClose }: RegistrationProps) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<SignUpData>({
    regUserName: "",
    regPassword: "",
    regRepeatPassword: "",
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
    const errorsObj = {
      regUserName: "",
      regPassword: "",
      regRepeatPassword: "",
    }
    if (!inputValues.regUserName.length) {
      errorsObj.regUserName = "The field can't be empty!"
    } else if (inputValues.regUserName.length < 4) {
      errorsObj.regUserName = "At least 4 characters are required!"
    }
    if (!inputValues.regPassword) {
      errorsObj.regPassword = "The field can't be empty!"
    } else if (!passwordRegEx.test(inputValues.regPassword)) {
      errorsObj.regPassword =
        "Passwords must contain at least 6 symbols, one capitalized letter and one number"
    } else if (inputValues.regPassword !== inputValues.regRepeatPassword) {
      errorsObj.regPassword =
        "The passwords aren't the same! Make sure they have same values."
    }
    return errorsObj
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copiedData: SignUpData = { ...userData }
    const id = event.target.id as
      | "regUserName"
      | "regPassword"
      | "regRepeatPassword"
    copiedData[id] = event.target.value
    setUserData(copiedData)
    setErrors(validation(copiedData))
  }

  useEffect(() => {
    setIsError(
      !!errors?.regUserName ||
        !!errors?.regPassword ||
        !!errors?.regRepeatPassword
    )
  }, [errors])

  useEffect(() => {
    setIsError(true)
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isError) {
      setErrors(validation(userData))
      const resetUserData: SignUpData = {
        regUserName: "",
        regPassword: "",
        regRepeatPassword: "",
      }
      setUserData(resetUserData)
    } else {
      const response = await registration(userData)
      if (response) {
        singInAction({
          userName: userData.regUserName,
          password: userData.regPassword,
        })
        navigate("/profile", { replace: true })
        signUpOnClose()
      } else {
        const registrationError = {
          regUserName: "",
          regPassword: "",
          regRepeatPassword: "",
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
      <label htmlFor="regUserName">Login:</label>
      <Input
        type="text"
        name="regUserName"
        id="regUserName"
        className="registration_form__input"
        placeholder="Name:"
        onChange={handleChange}
        value={userData.regUserName}
        autocomplete="off"
      />
      {errors?.regUserName ? (
        <p className="registration_form__error">{errors.regUserName}</p>
      ) : (
        <div className="registration_form__transparrent" />
      )}
      <label htmlFor="regPassword" className="registration_form__label">
        Password:
      </label>
      <div className="registration_form__input_field">
        <Input
          type={showPassword ? "text" : "password"}
          name="regPassword"
          id="regPassword"
          className="registration_form__input_inside"
          placeholder="Password:"
          onChange={handleChange}
          value={userData.regPassword}
        />
        {userData.regPassword && (
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
        htmlFor="regRepeatPassword"
        className="registration_form__label_repeat"
      >
        Repeat password:
      </label>
      <div className="registration_form__input_field">
        <Input
          type={showRepeatPassword ? "text" : "password"}
          name="regRepeatPassword"
          id="regRepeatPassword"
          className="registration_form__input_inside"
          placeholder="Repeat password:"
          onChange={handleChange}
          value={userData.regRepeatPassword}
        />
        {userData.regRepeatPassword && (
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
      {errors?.regPassword ? (
        <p className="registration_form__error">{errors.regPassword}</p>
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
