import React from "react"
import { Game } from "types"
import "./game-card.scss"

type Props = {
  game: Game
}

const GameCard = ({
  game: { title, price, imgSrc, description, ageAllowed },
}: Props) => (
  <div className="card_wrapper">
    <div className="card_wrapper__game_card">
      <div className="card_wrapper__front_side">
        <img src={imgSrc} alt={title} className="card_wrapper__image" />
        <div className="card_wrapper__details_container">
          <div className="card_wrapper__additional_info">
            <span className="card_wrapper__additional_info__item">{title}</span>
            <span className="card_wrapper__additional_info__item">{price}</span>
          </div>
          <div className="card_wrapper__rating_container">
            <img
              src="../images/icons8-star-filled-30.png"
              alt="rating star"
              className="card_wrapper__rating_img"
            />
            <img
              src="../images/icons8-star-filled-30.png"
              alt="rating star"
              className="card_wrapper__rating_img"
            />
            <img
              src="../images/icons8-star-filled-30.png"
              alt="rating star"
              className="card_wrapper__rating_img"
            />
            <img
              src="../images/icons8-star-filled-30.png"
              alt="rating star"
              className="card_wrapper__rating_img"
            />
            <img
              src="../images/icons8-star-filled-30.png"
              alt="rating star"
              className="card_wrapper__rating_img"
            />
          </div>
        </div>
      </div>
      <div className="card_wrapper__back_side">
        <p className="card_wrapper__game_info">{description}</p>
        <div className="card_wrapper__age">{ageAllowed}</div>
        <button className="card_wrapper__buy_btn" type="button">
          Add to cart
        </button>
      </div>
    </div>
  </div>
)

export default GameCard
