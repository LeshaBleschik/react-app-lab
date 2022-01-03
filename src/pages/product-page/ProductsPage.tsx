import React, { useCallback, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { debounce } from "lodash"
import { PRODUCTS_PAGE } from "routes"
import axios from "axios"
import GameCard from "components/game-card/GameCard"
import { Game } from "types"
import { PRODUCTS_SEARCH } from "api/constants"
import "./product-page.scss"

const ProductsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const category = search.get("category")
  const categoryTitle = "Filter"

  const useFetchData = (url: string) => {
    const [searchGames, setSearchGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect((): void => {
      setIsLoading(true)
      axios
        .get(url)
        .then((response) => {
          setSearchGames(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [location.search])
    return { searchGames, isLoading, setIsLoading }
  }

  const { searchGames, isLoading, setIsLoading } = useFetchData(
    `${PRODUCTS_SEARCH}${location.search}`
  )

  const updateUrl = useCallback(
    debounce((searchParams: URLSearchParams) => {
      navigate(`${PRODUCTS_PAGE}?${searchParams.toString()}`, { replace: true })
    }, 500),
    []
  )

  const eventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLInputElement
    const urlSearch = new URLSearchParams(location.search)
    setIsLoading(true)
    return { eventTarget, urlSearch }
  }

  const categoryChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLInputElement
    const urlSearch = new URLSearchParams(location.search)
    if (!eventTarget.value) {
      urlSearch.delete("sortType")
    } else {
      urlSearch.set("sortType", eventTarget.value)
    }
    updateUrl(urlSearch)
  }

  const sortByAmount = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLInputElement
    const urlSearch = new URLSearchParams(location.search)
    if (urlSearch.get("sortType") && eventTarget.value) {
      urlSearch.set("sortDir", eventTarget.value)
      setIsLoading(true)
    }
    if (!eventTarget.value) {
      urlSearch.delete("sortDir")
    }
    updateUrl(urlSearch)
  }

  const sortByGenre = (event: React.FormEvent<HTMLInputElement>) => {
    const { eventTarget, urlSearch } = eventHandler(event)
    if (eventTarget.value === "allGenres") {
      urlSearch.delete("genre")
    } else {
      urlSearch.set("genre", eventTarget.value)
    }
    updateUrl(urlSearch)
  }

  const sortByAge = (event: React.FormEvent<HTMLInputElement>) => {
    const { eventTarget, urlSearch } = eventHandler(event)
    if (eventTarget.value === "allAges") {
      urlSearch.delete("age")
    } else {
      urlSearch.set("age", eventTarget.value)
    }
    updateUrl(urlSearch)
  }

  return (
    <section className="products">
      <div className="products__filter">
        <h2 className="products__title products--title">
          {category || categoryTitle}
        </h2>
        <span className="products__filter_title">Sort</span>
        <div className="products__sort">
          <div
            className="products__sort_group products__sort--group"
            onChange={categoryChangeHandler}
          >
            <label htmlFor="criteria" className="products__sort_criteria">
              Criteria
            </label>
            <select
              name="criteria"
              id="criteria"
              className="products__select"
              defaultValue=""
            >
              <option value="" className="products__option">
                Options
              </option>
              <option value="rating" className="products__option">
                Rating
              </option>
              <option value="price" className="products__option">
                Price
              </option>
              <option value="date" className="products__option">
                Date
              </option>
            </select>
          </div>
          <div
            className="products__sort_group products__sort--group"
            onChange={sortByAmount}
          >
            <label htmlFor="type" className="products__sort_criteria">
              Type
            </label>
            <select
              name="type"
              id="type"
              className="products__select"
              defaultValue=""
            >
              <option value="">Options</option>
              <option value="Asc">Ascending</option>
              <option value="Desc">Descending</option>
            </select>
          </div>
        </div>
        <span className="products__filter_title">Genres</span>
        <div className="products__sort" onChange={sortByGenre}>
          <div className="products__sort_group">
            <input
              type="radio"
              id="allGenres"
              name="genres"
              value="allGenres"
              defaultChecked
            />
            <label htmlFor="allGenres">All genres</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="shooter" name="genres" value="shooter" />
            <label htmlFor="shooter">Shooter</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="strategy" name="genres" value="strategy" />
            <label htmlFor="strategy">Strategy</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="racing" name="genres" value="racing" />
            <label htmlFor="racing">Racing</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="fighting" name="genres" value="fighting" />
            <label htmlFor="fighting">Fighting</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="moba" name="genres" value="moba" />
            <label htmlFor="moba">MOBA</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="rpg" name="genres" value="rpg" />
            <label htmlFor="rpg">RPG</label>
          </div>
        </div>
        <span className="products__filter_title">Age</span>
        <div className="products__sort" onChange={sortByAge}>
          <div className="products__sort_group">
            <input
              type="radio"
              id="allAges"
              name="age"
              value="allAges"
              defaultChecked
            />
            <label htmlFor="allAges">All ages</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="six" name="age" value="6" />
            <label htmlFor="six">6+</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="twelve" name="age" value="12" />
            <label htmlFor="twelve">12+</label>
          </div>
          <div className="products__sort_group">
            <input type="radio" id="eighteen" name="age" value="18" />
            <label htmlFor="eighteen">18+</label>
          </div>
        </div>
      </div>
      <div className="products__container">
        <h2 className="products__title">Products</h2>
        <div className="products__list">
          {isLoading ? (
            <i className="fas fa-sync-alt products__search_icon" />
          ) : (
            searchGames.length &&
            searchGames.map((game) => <GameCard key={game.id} game={game} />)
          )}
          {!searchGames.length && (
            <p className="products__error">No result found</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
