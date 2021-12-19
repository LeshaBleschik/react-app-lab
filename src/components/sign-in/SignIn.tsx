import React, { useState, useEffect } from "react"
import "./sign-in.scss"
import Input from "elements/input/Input"
import Button from "elements/button/Button"
import useAuth from "../../useContext"

type SignInData = {
  userName: string
  password: string
  signInError?: string
}

type SignInErrors = SignInData | null

type SignInProps = {
  signInOnClose: () => void
}

const SignIn = ({ signInOnClose }: SignInProps) => {
  const { setUser, signIn } = useAuth()
  const [userData, setUserData] = useState<SignInData>({
    userName: "",
    password: "",
  })
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState<SignInErrors>(null)
  const [showPassword, setShowPassword] = useState(false)

  const toggleClickHandler = () => {
    setShowPassword(!showPassword)
  }

  const validation = (inputValues: SignInData) => {
    const passwordRegEx = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}/g
    const errorsObj = { userName: "", password: "" }
    if (!inputValues.userName.length) {
      errorsObj.userName = "The field can't be empty!"
    } else if (inputValues.userName.length < 4) {
      errorsObj.userName = "At least 4 characters are required!"
    }
    if (!inputValues.password) {
      errorsObj.password = "The field can't be empty!"
    } else if (!passwordRegEx.test(inputValues.password)) {
      errorsObj.password =
        "Password must contain at least 6 symbols, one capitalized letter and one number"
    }
    return errorsObj
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copiedData: SignInData = { ...userData }
    const id = event.target.id as "userName" | "password"
    copiedData[id] = event.target.value
    setUserData(copiedData)
    setErrors(validation(copiedData))
  }

  useEffect(() => {
    setIsError(!!errors?.userName || !!errors?.password)
  }, [errors])

  useEffect(() => {
    setIsError(true)
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isError) {
      setErrors(validation(userData))
      const resetUserData = { userName: "", password: "" }
      setUserData(resetUserData)
    } else {
      const response = await signIn(userData)
      if (response) {
        setUser({ userName: userData.userName })
        signInOnClose()
      } else {
        const signInError = {
          userName: "",
          password: "",
          signInError:
            "There is no user with this input data.  At first you have to registrate.",
        }
        setErrors(signInError)
      }
    }
  }

  return (
    <form className="sign_in_form" onSubmit={submit}>
      <h2 className="sign_in_form__title">Authorization</h2>
      {errors?.signInError ? (
        <p className="sign_in_form__error">{errors.signInError}</p>
      ) : (
        <div className="sign_in_form__transparrent" />
      )}
      <label htmlFor="userName" className="sign_in_form__label">
        Login:
      </label>
      <Input
        type="text"
        name="userName"
        id="userName"
        className="sign_in_form__input"
        placeholder="Name:"
        onChange={handleChange}
        value={userData.userName}
        autocomplete="off"
      />
      {errors?.userName ? (
        <p className="sign_in_form__error">{errors.userName}</p>
      ) : (
        <div className="sign_in_form__transparrent" />
      )}

      <label htmlFor="password" className="sign_in_form__label">
        Password:
      </label>
      <div className="sign_in_form__input_field">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          className="sign_in_form__input_inside"
          placeholder="Password:"
          onChange={handleChange}
          value={userData.password}
        />
        {userData.password && (
          <button type="button" onClick={toggleClickHandler} className="reset">
            <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"} />
          </button>
        )}
      </div>

      {errors?.password ? (
        <p className="sign_in_form__error">{errors.password}</p>
      ) : (
        <div className="sign_in_form__transparrent" />
      )}
      <Button className="sign_in_form__submit" title="Submit" type="submit" />
    </form>
  )
}

export default SignIn
