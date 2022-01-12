import React, { useEffect, useState } from "react"
import Input from "elements/input/Input"
import "./profile.scss"
import Button from "elements/button/Button"
import { useSelector, useDispatch } from "react-redux"
import { saveProfile } from "redux/reducers/userReducer"
import { setUser } from "redux/actions"
import axios from "axios"
import { SAVE_IMAGE } from "api/constants"
import { getUserSelector } from "redux/selectors"

type PasswordProps = {
  passwordClickToggle: () => void
}

type Errors = {
  input?: string
  textArea?: string
} | null

type ProfileInputData = {
  user: string
  profileDescription: string
}

interface File extends Blob {
  readonly lastModified: number
  readonly name: string
  readonly webkitRelativePath: string
}

const Profile = ({ passwordClickToggle }: PasswordProps) => {
  const user = useSelector(getUserSelector)
  const [profileData, setProfileData] = useState({
    user: "",
    profileDescription: "",
  })
  const [isError, setIsError] = useState(false)
  const [errors, setErrors] = useState<Errors>(null)
  const [image, setImage] = useState<File>()
  const dispatch = useDispatch()

  const validation = (inputValues: ProfileInputData) => {
    const errorsObj = {
      input: "",
      textArea: "",
    }
    if (!inputValues.user) {
      errorsObj.input = "The field can't be empty!"
    } else if (inputValues.user.length < 4) {
      errorsObj.input = "The name must have at least 4 characters!"
    }
    if (!inputValues.profileDescription) {
      errorsObj.textArea = "The field can't be empty!"
    }
    return errorsObj
  }

  const OnChangeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const copyiedProfileData: ProfileInputData = { ...profileData }
    const id = event.target.id as "user" | "profileDescription"
    copyiedProfileData[id] = event.target.value
    setProfileData(copyiedProfileData)
    setErrors(validation(copyiedProfileData))
  }

  useEffect(() => {
    setIsError(!!errors?.input || !!errors?.textArea)
  }, [errors])

  useEffect(() => {
    setIsError(true)
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setProfileData({ user: "", profileDescription: "" })
    if (isError) {
      setErrors(validation(profileData))
    } else {
      alert("Profile page modified.")
      const modifiedUserData = {
        userName: user.userName,
        newName: profileData.user,
        fields: profileData.profileDescription,
      }
      const response = await saveProfile(modifiedUserData)
      if (response) {
        dispatch(setUser(response.data))
      }
    }
  }

  const sendImage = (event: React.FormEvent) => {
    event.preventDefault()
    if (image) {
      const data = new FormData()
      data.append("image", image)
      data.append("user", user.userName)
      axios
        .post(SAVE_IMAGE, data)
        .then((res) => {
          dispatch(setUser(res.data))
        })
        .catch((error) => console.log(error))
    }
  }

  const setFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return
    const file = event.currentTarget.files[0]
    setImage(file)
  }

  return (
    <section className="profile">
      <h2 className="profile__title">{user?.userName} profile page</h2>
      <div className="profile__container">
        <form className="profile__img_section" onSubmit={sendImage}>
          {user?.image ? (
            <img src={user?.image} className="profile__img" alt="user" />
          ) : (
            <img
              className="profile__img"
              src="./images/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              alt="not available"
            />
          )}
          <div className="profile__buttons_group profile__buttons--group">
            <label htmlFor="image" className="profile__choose_file">
              <input type="file" id="image" onChange={setFile} />
              Choose image
            </label>
            <Button
              className="profile__change_img"
              title="Change profile image"
              type="submit"
            />
          </div>
        </form>
        <div className="profile__user_info">
          <form className="profile__form" onSubmit={submit}>
            <div className="profile__form_group">
              <label htmlFor="user" className="profile__label">
                Name
              </label>
              <Input
                type="text"
                name="userName"
                id="user"
                className="profile__input"
                onChange={OnChangeHandler}
                value={profileData.user}
                placeholder="Name"
                autocomplete="off"
                maxLength={20}
              />
              {errors?.input ? (
                <p className="profile__error">{errors.input}</p>
              ) : (
                <div className="profile__transparrent" />
              )}
            </div>
            <div className="profile__form_group">
              <label htmlFor="profileDescription" className="profile__label">
                Profile description
              </label>
              <textarea
                name="profileDescription"
                id="profileDescription"
                className="profile__text_area"
                placeholder="Description"
                onChange={OnChangeHandler}
                value={profileData.profileDescription}
                cols={40}
                rows={8}
                maxLength={200}
              />
              {errors?.textArea ? (
                <p className="profile__error">{errors.textArea}</p>
              ) : (
                <div className="profile__transparrent" />
              )}
            </div>
            <div className="profile__buttons_group">
              <Button
                className="profile__save_profile"
                title="Save profile"
                type="submit"
              />
              <Button
                className="profile__change_password"
                title="Change password"
                onClick={passwordClickToggle}
              />
            </div>
          </form>
        </div>
        <div className="profile__description_section">
          <div className="profile__info_title">Personal information</div>
          {user?.fields ? (
            <div className="profile__description">
              <pre className="profile__personal_info">{user?.fields}</pre>
            </div>
          ) : (
            <div className="profile__description">
              There is no additional info yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Profile
