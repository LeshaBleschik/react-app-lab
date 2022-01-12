import React, { useEffect, useState } from "react"
import Button from "elements/button/Button"
import Input from "elements/input/Input"
import "./change-password.scss"
import { changePassword } from "redux/reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "redux/actions"
import { getUserSelector } from "redux/selectors"

type SignUpData = {
  chPassword: string
  chRepeatPassword: string
}

type SignUpErrors = SignUpData | null

type PaswordProps = {
  passwordClickToggle: () => void
}

const ChangePassword = ({ passwordClickToggle }: PaswordProps) => {
  const dispatch = useDispatch()
  const user = useSelector(getUserSelector)
  const [userData, setUserData] = useState<SignUpData>({
    chPassword: "",
    chRepeatPassword: "",
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
      chPassword: "",
      chRepeatPassword: "",
    }
    if (!inputValues.chPassword) {
      errorsObj.chPassword = "The field can't be empty!"
    } else if (!passwordRegEx.test(inputValues.chPassword)) {
      errorsObj.chPassword =
        "Passwords must contain at least 6 symbols, one capitalized letter and one number"
    } else if (inputValues.chPassword !== inputValues.chRepeatPassword) {
      errorsObj.chPassword =
        "The passwords aren't the same! Make sure they have same values."
    }
    return errorsObj
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copiedData: SignUpData = { ...userData }
    const id = event.target.id as "chPassword" | "chRepeatPassword"
    copiedData[id] = event.target.value
    setUserData(copiedData)
    setErrors(validation(copiedData))
  }

  useEffect(() => {
    setIsError(!!errors?.chPassword || !!errors?.chRepeatPassword)
  }, [errors])

  useEffect(() => {
    setIsError(true)
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isError) {
      setErrors(validation(userData))
      const resetUserData: SignUpData = {
        chPassword: "",
        chRepeatPassword: "",
      }
      setUserData(resetUserData)
    } else {
      const passwordData = {
        userName: user?.userName,
        password: userData.chPassword,
      }
      const response = await changePassword(passwordData)
      if (response) {
        dispatch(setUser(response.data))
        passwordClickToggle()
        alert("Password has successfully changed.")
      }
    }
  }

  return (
    <form className="change_password" onSubmit={submit}>
      <h2 className="change_password__title">Change password</h2>
      <label htmlFor="chPassword" className="change_password__label">
        New password:
      </label>
      <div className="change_password__input_field">
        <Input
          type={showPassword ? "text" : "password"}
          name="chPassword"
          id="chPassword"
          className="change_password__input_inside"
          placeholder="Password:"
          onChange={handleChange}
          value={userData.chPassword}
        />
        {userData.chPassword && (
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
        htmlFor="chRepeatPassword"
        className="change_password__label_repeat"
      >
        Repeat password:
      </label>
      <div className="change_password__input_field">
        <Input
          type={showRepeatPassword ? "text" : "password"}
          name="chRepeatPassword"
          id="chRepeatPassword"
          className="change_password__input_inside"
          placeholder="Repeat password:"
          onChange={handleChange}
          value={userData.chRepeatPassword}
        />
        {userData.chRepeatPassword && (
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
      {errors?.chPassword ? (
        <p className="change_password__error">{errors.chPassword}</p>
      ) : (
        <div className="change_password__transparrent" />
      )}
      <Button
        className="change_password__submit"
        title="Submit"
        type="submit"
      />
    </form>
  )
}

export default ChangePassword
