import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ABOUT_PAGE,
  PRODUCTS_PAGE,
} from "routes"
import "./header.scss"

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const clickHandler = () => {
    setIsActive(!isActive)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      clickHandler()
    }
  }

  return (
    <header className="header">
      <Link to={HOME_PAGE} className="header__title heading">
        Biggest Game Store
      </Link>
      <nav className={isActive ? "header__nav" : "header__nav active"}>
        <ul className="header__list">
          <li className="header__item">
            <Link
              to={HOME_PAGE}
              className="header__link"
              onClick={clickHandler}
            >
              Home
            </Link>
          </li>
          <li className="header__item dropdown_menu_section">
            <Link
              to={PRODUCTS_PAGE}
              type="button"
              className="header__products_link"
              onClick={clickHandler}
            >
              Products
              <img
                className="header__image"
                src="/images/arrow-199-16.png"
                alt="down arrow"
              />
            </Link>
            <ul className="dropdown_menu">
              <li className="dropdown_menu__item">
                <Link
                  to={`${PRODUCTS_PAGE}?category=ps`}
                  className="dropdown_menu__link"
                  onClick={clickHandler}
                >
                  Playstation 5
                </Link>
              </li>
              <li className="dropdown_menu__item">
                <Link
                  to={`${PRODUCTS_PAGE}?category=pc`}
                  className="dropdown_menu__link"
                  onClick={clickHandler}
                >
                  PC
                </Link>
              </li>
              <li className="dropdown_menu__item">
                <Link
                  to={`${PRODUCTS_PAGE}?category=xbox`}
                  className="dropdown_menu__link"
                  onClick={clickHandler}
                >
                  XBox One
                </Link>
              </li>
            </ul>
          </li>
          <li className="header__item">
            <Link
              to={ABOUT_PAGE}
              className="header__link"
              onClick={clickHandler}
            >
              About
            </Link>
          </li>
          <li className="header__item">
            <Link
              to={SIGN_IN_PAGE}
              className="header__link"
              onClick={clickHandler}
            >
              Sign In
            </Link>
          </li>
          <li className="header__item">
            <Link
              to={SIGN_UP_PAGE}
              className="header__link"
              onClick={clickHandler}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
      <i
        aria-label="hamburger menu button"
        role="button"
        tabIndex={0}
        className={isActive ? "fas fa-bars hamburger" : "fas fa-times cross"}
        onClick={clickHandler}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

export default Header
