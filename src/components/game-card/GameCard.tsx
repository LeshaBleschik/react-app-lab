import Button from "elements/button/Button"
import React from "react"
import { CartData, Game } from "types"
import { useSelector, useDispatch } from "react-redux"
import { addGameInfo, addToCart, editCardOpen } from "redux/actions"
import "./game-card.scss"
import {
  getAdminSelector,
  getCartSelector,
  getUserSelector,
} from "redux/selectors"
import { useLocation } from "react-router"
import { PRODUCTS_PAGE } from "routes"

type Props = {
  game: Game
}

const GameCard = ({
  game: {
    title,
    price,
    imgSrc,
    description,
    ageAllowed,
    category,
    rating,
    id,
    genre,
  },
}: Props) => {
  const user = useSelector(getUserSelector)
  const cart = useSelector(getCartSelector)
  const admin = useSelector(getAdminSelector)
  const location = useLocation()
  const dispatch = useDispatch()

  const addCart = () => {
    if (user) {
      const cartData = {
        id,
        name: title,
        platform: category,
        price: parseFloat(price),
        amount: 1,
      }
      if (!cart) {
        dispatch(addToCart(cartData))
      } else {
        const foundItem = cart.find((cartItem: CartData) => id === cartItem.id)
        if (!foundItem) {
          dispatch(addToCart(cartData))
        }
      }
    }
  }

  const editHandler = () => {
    dispatch(editCardOpen())
    const actualGameInfo = {
      id,
      name: title,
      image: imgSrc,
      genre,
      price,
      description,
      age: ageAllowed,
      category,
    }
    dispatch(addGameInfo(actualGameInfo))
  }

  return (
    <div className="card_wrapper">
      <div className="card_wrapper__game_card">
        <div className="card_wrapper__front_side">
          <div className="card_wrapper__category">
            {category.map((name) => (
              <img
                key={Math.random() * 100000}
                src={`../images/${name}.png`}
                alt={name}
                className="card_wrapper__category_img"
              />
            ))}
          </div>
          <img src={imgSrc} alt={title} className="card_wrapper__image" />
          <div className="card_wrapper__details_container">
            <div className="card_wrapper__additional_info">
              <span className="card_wrapper__additional_info__item">
                {title}
              </span>
              <span className="card_wrapper__additional_info__item">{`${price}$`}</span>
            </div>
            <div className="card_wrapper__rating_container">
              {rating.map((star) => (
                <img
                  src={`../images/${star}.png`}
                  alt="rating star"
                  className="card_wrapper__rating_img"
                  key={Math.random() * 100000}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="card_wrapper__back_side">
          <p className="card_wrapper__game_info">{description}</p>
          <div className="card_wrapper__age">{`${ageAllowed}+`}</div>
          <div className="card_wrapper__btn_group">
            {admin && location.pathname === PRODUCTS_PAGE ? (
              <>
                <Button
                  className="card_wrapper__buy_btn"
                  title="Add to cart"
                  onClick={addCart}
                />
                <Button
                  className="card_wrapper__edit_btn"
                  title="Edit"
                  onClick={editHandler}
                />
              </>
            ) : (
              <Button
                className="card_wrapper__buy_btn"
                title="Add to cart"
                onClick={addCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
