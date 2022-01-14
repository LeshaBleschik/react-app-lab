import React, { useState } from "react"
import Button from "elements/button/Button"
import Input from "elements/input/Input"
import "./edit-card.scss"
import { Card } from "types"
import { useDispatch, useSelector } from "react-redux"
import { getEditCardDataSelector } from "redux/selectors"
import { confirmationWindowOpen, editCardClose, setGame } from "redux/actions"
import { editCard } from "redux/reducers/editCardReducer"

type GameInfo = Omit<Card, "rating">

const EditCard = () => {
  const gameInfo = useSelector(getEditCardDataSelector)
  const dispatch = useDispatch()
  const { name, image, genre, price, description, age, category, id } = gameInfo
  const [newGame, setNewGame] = useState<GameInfo>({
    id,
    title: name,
    image,
    price,
    description,
    age,
    genre,
    category,
  })

  const pc = category.find((cat: string) => cat === "pc")
  const ps = category.find((cat: string) => cat === "ps")
  const xbox = category.find((cat: string) => cat === "xbox")

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const copiedCard: GameInfo = { ...newGame }
    const key = event.target.id as
      | "title"
      | "image"
      | "price"
      | "age"
      | "description"
    copiedCard[key] = event.target.value
    setNewGame(copiedCard)
  }

  const genreChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewGame({
      ...newGame,
      genre: (event.target as HTMLSelectElement).value,
    })
  }

  const categoryChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement
    if (target.checked) {
      setNewGame((prev) => ({
        ...prev,
        category: [...prev.category, target.value],
      }))
    } else {
      setNewGame((prev) => ({
        ...prev,
        category: prev.category.filter((cat) => cat !== target.value),
      }))
    }
  }

  const confirmationClickHandler = () => {
    dispatch(editCardClose())
    dispatch(confirmationWindowOpen())
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await editCard(newGame)
    if (response) {
      dispatch(setGame(response.data))
      dispatch(editCardClose())
      alert("The game was successfully modified")
    }
  }

  return (
    <form className="edit_card" onSubmit={submit}>
      <h2 className="edit_card__title">Edit Card</h2>
      <div className="edit_card__card_details">
        <div className="edit_card__img_section">
          <h6 className="edit_card__section_title">Card Image</h6>
          <img src={image} alt={name} className="edit_card__image" />
        </div>
        <div className="edit_card__info_section">
          <h6 className="edit_card__section_title">Information</h6>
          <div className="edit_card__form_group">
            <label htmlFor="title" className="edit_card__label">
              Name:
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              className="edit_card__input"
              placeholder="Name"
              onChange={handleChange}
              value={newGame?.title}
              autocomplete="off"
            />
          </div>
          <div className="edit_card__form_group">
            <label htmlFor="image" className="edit_card__label">
              Image:
            </label>
            <Input
              type="text"
              name="image"
              id="image"
              className="edit_card__input"
              placeholder="Image"
              onChange={handleChange}
              value={newGame?.image}
              autocomplete="off"
            />
          </div>
          <div className="edit_card__form_group">
            <label htmlFor="price" className="edit_card__label">
              Price:
            </label>
            <Input
              type="text"
              name="price"
              id="price"
              className="edit_card__input"
              placeholder="Price"
              onChange={handleChange}
              value={newGame?.price}
            />
          </div>
          <div className="edit_card__form_group">
            <label htmlFor="age" className="edit_card__label">
              Age:
            </label>
            <Input
              type="number"
              name="age"
              id="age"
              className="edit_card__input"
              placeholder="Age"
              onChange={handleChange}
              value={newGame?.age}
              min={6}
              max={18}
            />
          </div>
          <div className="edit_card__form_group">
            <label htmlFor="description" className="edit_card__label">
              Description:
            </label>
            <div className="edit_card__text_area_set_width">
              <textarea
                name="description"
                id="description"
                className="edit_card__text_area"
                placeholder="Description"
                onChange={handleChange}
                value={newGame?.description}
                cols={24}
                rows={8}
                maxLength={200}
              />
            </div>
          </div>
          <div className="edit_card__form_group">
            <label htmlFor="category" className="edit_card__label">
              Category:
            </label>
            <div className="edit_card__selection_group">
              <select
                name="category"
                id="category"
                className="edit_card__select"
                defaultValue={genre}
                onChange={genreChangeHandler}
              >
                <option value="Shooter">Shooter</option>
                <option value="Strategy">Strategy</option>
                <option value="Racing">Racing</option>
                <option value="Fighting">Fighting</option>
                <option value="moba">MOBA</option>
                <option value="rpg">RPG</option>
              </select>
              <i className="fas fa-sort-down" />
            </div>
          </div>
          <div className="edit_card__platform_wrapper">
            <div className="edit_card__platform_title">Platform</div>
            <div className="edit_card__form_group">
              <label htmlFor="pc" className="edit_card__label">
                PC
              </label>
              <Input
                type="checkbox"
                id="pc"
                name="pc"
                value="pc"
                className="edit_card__ckeckbox"
                defaultChecked={!!pc}
                onChange={categoryChangeHandler}
              />
            </div>
            <div className="edit_card__form_group">
              <label htmlFor="ps" className="edit_card__label">
                Playstation 5
              </label>
              <Input
                type="checkbox"
                id="ps"
                name="ps"
                value="ps"
                className="edit_card__ckeckbox"
                defaultChecked={!!ps}
                onChange={categoryChangeHandler}
              />
            </div>
            <div className="edit_card__form_group">
              <label htmlFor="xbox" className="edit_card__label">
                XBox One
              </label>
              <Input
                type="checkbox"
                id="xbox"
                name="xbox"
                value="xbox"
                className="edit_card__ckeckbox"
                defaultChecked={!!xbox}
                onChange={categoryChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="edit_card__buttons_group">
        <Button className="edit_card__submit" title="Submit" type="submit" />
        <Button
          className="edit_card__delete"
          title="Delete card"
          onClick={confirmationClickHandler}
        />
      </div>
    </form>
  )
}

export default EditCard
