import React from "react"
import { Link } from "react-router-dom"
import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ABOUT_PAGE,
  PRODUCT_GAMES_PAGE,
  PRODUCT_CONSOLES_PAGE,
  PRODUCT_ACCESSORIES_PAGE,
} from "routes"
import "./header.scss"

const Header = () => (
  <header className="header">
    <h4 className="header__title">Biggest Game Store</h4>
    <nav className="header__nav">
      <ul className="header__list">
        <li className="header__item">
          <Link to={HOME_PAGE} className="header__link">
            Home
          </Link>
        </li>
        <li className="header__item dropdown_menu_section">
          <button type="button" className="header__button">
            Products
            <img
              className="header__image"
              src="/images/arrow-199-16.png"
              alt="down arrow"
            />
          </button>
          <ul className="dropdown_menu">
            <li className="dropdown_menu__item">
              <Link to={PRODUCT_GAMES_PAGE} className="dropdown_menu__link">
                Games
              </Link>
            </li>
            <li className="dropdown_menu__item">
              <Link to={PRODUCT_CONSOLES_PAGE} className="dropdown_menu__link">
                Consoles
              </Link>
            </li>
            <li className="dropdown_menu__item">
              <Link
                to={PRODUCT_ACCESSORIES_PAGE}
                className="dropdown_menu__link"
              >
                Accessoriess
              </Link>
            </li>
          </ul>
        </li>
        <li className="header__item">
          <Link to={ABOUT_PAGE} className="header__link">
            About
          </Link>
        </li>
        <li className="header__item">
          <Link to={SIGN_IN_PAGE} className="header__link">
            Sign In
          </Link>
        </li>
        <li className="header__item">
          <Link to={SIGN_UP_PAGE} className="header__link">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
