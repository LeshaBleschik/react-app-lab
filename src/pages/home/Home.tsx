import SearchBar from "components/reusable components/search-bar/SearchBar"
import React from "react"
import {
  PRODUCT_PC_GAMES_PAGE,
  PRODUCT_PLAYSTATION_5_GAMES_PAGE,
  PRODUCT_XBOX_ONE_GAMES_PAGE,
} from "routes"
import { Link } from "react-router-dom"
import "./home.scss"
import GameCard from "components/reusable components/game card/GameCard"
import { Game } from "../../types/index"

type Props = {
  games: Game[]
}

const Home = ({ games }: Props) => (
  <main className="home_page_container">
    <SearchBar />
    <section className="catagories_background_container items_container">
      <div className="catagories_background_container__title">Categories</div>
      <nav className="catagories_background_container__navigation">
        <Link
          to={PRODUCT_PC_GAMES_PAGE}
          className="catagories_background_container__link"
        >
          <img
            src="../images/icons8-windows-10-50.png"
            alt="personal computer"
            className="catagories_background_container__image"
          />
          PC
        </Link>
        <Link
          to={PRODUCT_PLAYSTATION_5_GAMES_PAGE}
          className="catagories_background_container__link"
        >
          <img
            src="../images/icons8-playstation-50.png"
            alt="playstation 5"
            className="catagories_background_container__image"
          />
          Playstation 5
        </Link>
        <Link
          to={PRODUCT_XBOX_ONE_GAMES_PAGE}
          className="catagories_background_container__link"
        >
          <img
            src="../images/icons8-xbox-50.png"
            alt="xbox one"
            className="catagories_background_container__image"
          />
          XBox One
        </Link>
      </nav>
    </section>
    <section className="games_background_container items_container">
      <div className="catagories_background_container__title">New games</div>
      <div className="games_background_container__items">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  </main>
)

export default Home
