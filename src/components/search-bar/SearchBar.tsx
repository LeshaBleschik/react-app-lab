import React, { useEffect, useState, useCallback } from "react"
import { PRODUCTS_PAGE, HOME_PAGE } from "routes"
import "./search-bar.scss"
import { useLocation } from "react-router"
import { useNavigate } from "react-router-dom"
import debounce from "lodash.debounce"

const SearchBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const navigationUrl = new URLSearchParams(location.search)
  const urlCategory = navigationUrl.get("category")
  const [inputValue, setInputValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateUrl = useCallback(
    debounce((search) => {
      navigate(`${PRODUCTS_PAGE}?${search}`, { replace: true })
      setIsLoading(false)
    }, 300),
    []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateUrl.cancel()
    const newSearch = new URLSearchParams(location.search)
    if (!event.target.value.length) {
      newSearch.delete("search")
    } else {
      newSearch.set("search", event.target.value)
    }
    updateUrl(newSearch.toString())
    setInputValue(event.target.value)
    setIsLoading(true)
  }

  useEffect(() => {
    const urlSearch = navigationUrl.get("search")
    if (urlSearch !== null) {
      setInputValue(urlSearch)
    }
  }, [])

  const handleClick = () => {
    updateUrl.cancel()
    navigationUrl.delete("search")
    updateUrl(navigationUrl.toString())
    setInputValue("")
    setIsLoading(true)
  }

  useEffect(() => {
    if (location.pathname === HOME_PAGE && inputValue.length) {
      setInputValue("")
    }
  }, [location.pathname])

  useEffect(() => {
    setInputValue("")
  }, [urlCategory])

  if (location.pathname !== HOME_PAGE && location.pathname !== PRODUCTS_PAGE) {
    return null
  }

  return (
    <div className="search_bar">
      <i
        className={
          !isLoading
            ? "fas fa-search search_bar__search_icon"
            : "fas fa-sync-alt search_bar__search_icon"
        }
      />
      <input
        onChange={handleChange}
        value={inputValue}
        type="text"
        placeholder="Search:"
        className="search_bar__input"
      />
      {!!inputValue.length && (
        <button
          type="button"
          onClick={handleClick}
          className="search_bar__close_button"
        >
          <i
            className="fas fa-times search_bar__close_icon"
            aria-label="close button"
          />
        </button>
      )}
    </div>
  )
}

export default SearchBar
