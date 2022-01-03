import React from "react"
import { Link } from "react-router-dom"
import "./home.scss"
import GameCard from "components/game-card/GameCard"
import { PRODUCTS_PAGE } from "../../routes"
import { Game } from "../../types/index"

type Props = {
  games: Game[]
}

const Home = ({ games }: Props) => (
  <main className="home_page_container">
    <section className="catagories_container items_container">
      <div className="catagories_container__title">Categories</div>
      <nav className="catagories_container__navigation">
        <Link
          to={`${PRODUCTS_PAGE}?category=pc`}
          className="catagories_container__link"
        >
          <img
            src="../images/pc.png"
            alt="personal computer"
            className="catagories_container__image"
          />
          PC
        </Link>
        <Link
          to={`${PRODUCTS_PAGE}?category=ps`}
          className="catagories_container__link"
        >
          <img
            src="../images/ps.png"
            alt="playstation 5"
            className="catagories_container__image"
          />
          Playstation 5
        </Link>
        <Link
          to={`${PRODUCTS_PAGE}?category=xbox`}
          className="catagories_container__link"
        >
          <img
            src="../images/xbox.png"
            alt="xbox one"
            className="catagories_container__image"
          />
          XBox One
        </Link>
      </nav>
    </section>
    <section className="games_container items_container">
      <div className="catagories_container__title">New games</div>
      <div className="games_container__items">
        {games.length ? (
          games.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p>The server is down! Try again later.</p>
        )}
      </div>
    </section>
  </main>
)

export default Home
