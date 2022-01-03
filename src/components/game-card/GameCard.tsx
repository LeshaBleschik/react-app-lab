import Button from "elements/button/Button"
import React from "react"
import { Game } from "types"
import "./game-card.scss"

type Props = {
  game: Game
}

const GameCard = ({
  game: { title, price, imgSrc, description, ageAllowed, category, rating },
}: Props) => (
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
            <span className="card_wrapper__additional_info__item">{title}</span>
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
        <Button className="card_wrapper__buy_btn" title="Add to cart" />
      </div>
    </div>
  </div>
)

export default GameCard
