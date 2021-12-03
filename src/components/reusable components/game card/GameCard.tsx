import React from "react"
import { Game } from "types"
import "./game-card.scss"

type Props = {
  game: Game
}

const GameCard = ({ game: { title, price, imgSrc } }: Props) => (
  <div className="game_card">
    <img src={imgSrc} alt={title} className="game_card__image" />
    <div className="game_card__additional_info">
      <span className="game_card__additional_info__item">{title}</span>
      <span className="game_card__additional_info__item">{price}</span>
    </div>
    <div className="game_card__rating_container">
      <img
        src="../images/arrow-199-16.png"
        alt="hhh"
        className="game_card__rating_img"
      />
      <img
        src="../images/arrow-199-16.png"
        alt="hhh"
        className="game_card__rating_img"
      />
      <img
        src="../images/arrow-199-16.png"
        alt="hhh"
        className="game_card__rating_img"
      />
      <img
        src="../images/arrow-199-16.png"
        alt="hhh"
        className="game_card__rating_img"
      />
      <img
        src="../images/arrow-199-16.png"
        alt="hhh"
        className="game_card__rating_img"
      />
    </div>
  </div>
)

export default GameCard
