import React, { useState, useEffect, useMemo } from "react"
import { PRODUCTS_SEARCH } from "routes"
import axios from "axios"
import { useLocation } from "react-router"
import "./product-page.scss"
import GameCard from "components/game-card/GameCard"
import { Game } from "types"

const ProductsPage = () => {
  const [searchGames, setSearchGames] = useState<Game[]>([])

  const location = useLocation()
  const search = new URLSearchParams(location.search)
  let category = search.get("category")

  useEffect((): void => {
    axios
      .get(`${PRODUCTS_SEARCH}${location.search}`)
      .then((response) => {
        setSearchGames(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [location.search])

  const memoizedCategory = useMemo(() => {
    if (category) {
      category = category[0].toUpperCase() + category.slice(1)
    }
    return category
  }, [category])

  return (
    <section className="wrapper">
      <div className="search_result">
        {!category ? (
          <h2 className="search_result__title">All categories</h2>
        ) : (
          <h2 className="search_result__title"> {memoizedCategory}</h2>
        )}
        <div className="search_result__list">
          {searchGames.length ? (
            searchGames.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className="search_result__error">No result found</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
