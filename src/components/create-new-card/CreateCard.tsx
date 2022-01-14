import React, { useState } from "react"
import Button from "elements/button/Button"
import Input from "elements/input/Input"
import "./create-card.scss"
import { Card } from "types"
import { createCard } from "redux/reducers/createCardReducer"
import { useDispatch } from "react-redux"
import { createCardClose, setGame } from "redux/actions"

const CreateCard = () => {
  const [card, setCard] = useState<Card>({
    title: "",
    image: "",
    price: "",
    description: "",
    age: "",
    rating: "",
    genre: "Shooter",
    category: [],
  })
  const dispatch = useDispatch()

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const copiedCard: Card = { ...card }
    const id = event.target.id as
      | "title"
      | "image"
      | "price"
      | "age"
      | "rating"
      | "description"
    copiedCard[id] = event.target.value
    setCard(copiedCard)
  }

  const genreChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCard({
      ...card,
      genre: (event.target as HTMLSelectElement).value,
    })
  }

  const categoryChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement
    if (target.checked) {
      setCard((prev) => ({
        ...prev,
        category: [...prev.category, target.value],
      }))
    } else {
      setCard((prev) => ({
        ...prev,
        category: prev.category.filter((cat) => cat !== target.value),
      }))
    }
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await createCard(card)
    if (response) {
      dispatch(setGame(response.data))
      dispatch(createCardClose())
      alert("The game was successfully created")
    }
  }

  return (
    <form className="card_creation" onSubmit={submit}>
      <h2 className="card_creation__title">Create card</h2>
      <div className="card_creation__form_group">
        <label htmlFor="title" className="card_creation__label">
          Name:
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          className="card_creation__input"
          placeholder="Name"
          onChange={handleChange}
          value={card?.title}
          autocomplete="off"
        />
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="image" className="card_creation__label">
          Image:
        </label>
        <Input
          type="text"
          name="image"
          id="image"
          className="card_creation__input"
          placeholder="Image"
          onChange={handleChange}
          value={card?.image}
          autocomplete="off"
        />
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="price" className="card_creation__label">
          Price:
        </label>
        <Input
          type="text"
          name="price"
          id="price"
          className="card_creation__input"
          placeholder="Price"
          onChange={handleChange}
          value={card?.price}
        />
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="age" className="card_creation__label">
          Age:
        </label>
        <Input
          type="number"
          name="age"
          id="age"
          className="card_creation__input"
          placeholder="Age"
          onChange={handleChange}
          value={card?.age}
          min={6}
          max={18}
        />
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="rating" className="card_creation__label">
          Rating:
        </label>
        <Input
          type="number"
          name="rating"
          id="rating"
          className="card_creation__input"
          placeholder="Rating"
          onChange={handleChange}
          value={card?.rating}
          min={1}
          max={5}
        />
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="description" className="card_creation__label">
          Description:
        </label>
        <div className="card_creation__text_area_set_width">
          <textarea
            name="description"
            id="description"
            className="card_creation__text_area"
            placeholder="Description"
            onChange={handleChange}
            value={card?.description}
            cols={32}
            rows={6}
            maxLength={200}
          />
        </div>
      </div>
      <div className="card_creation__form_group">
        <label htmlFor="category" className="card_creation__label">
          Category:
        </label>
        <div className="card_creation__selection_group">
          <select
            name="category"
            id="category"
            className="card_creation__select"
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
      <div className="card_creation__platform_wrapper">
        <div className="card_creation__platform_title">Platform</div>
        <div className="card_creation__form_group">
          <label htmlFor="pc" className="card_creation__label">
            PC
          </label>
          <Input
            type="checkbox"
            id="pc"
            name="platform"
            value="pc"
            className="card_creation__ckeckbox"
            onChange={categoryChangeHandler}
          />
        </div>
        <div className="card_creation__form_group">
          <label htmlFor="ps" className="card_creation__label">
            Playstation 5
          </label>
          <Input
            type="checkbox"
            id="ps"
            name="platform"
            value="ps"
            className="card_creation__ckeckbox"
            onChange={categoryChangeHandler}
          />
        </div>
        <div className="card_creation__form_group">
          <label htmlFor="xbox" className="card_creation__label">
            XBox One
          </label>
          <Input
            type="checkbox"
            id="xbox"
            name="platform"
            value="xbox"
            className="card_creation__ckeckbox"
            onChange={categoryChangeHandler}
          />
        </div>
      </div>
      <Button className="card_creation__submit" title="Submit" type="submit" />
    </form>
  )
}

export default CreateCard
