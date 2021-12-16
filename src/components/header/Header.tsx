import React, { useState } from "react"
import { Link } from "react-router-dom"
import { HOME_PAGE, ABOUT_PAGE, PRODUCTS_PAGE } from "routes"
import { useNavigate } from "react-router"
import "./header.scss"
import { User } from "types"

type HeaderProps = {
  signInState: () => void
  signUpState: () => void
  isLoggedIn: boolean
  user: User
  logOutSetter: () => void
}

const Header = ({
  signInState,
  signUpState,
  isLoggedIn,
  user,
  logOutSetter,
}: HeaderProps) => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  const clickHandler = () => {
    setIsActive(!isActive)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      clickHandler()
    }
  }

  const logOut = () => {
    navigate("/", { replace: true })
    logOutSetter()
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
              <i
                className="fas fa-sort-down header__icon"
                aria-label="sort down arrow"
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
            {isLoggedIn ? (
              <button type="button" className="header__btn header__logged_in">
                <i className="fas fa-user" />
                {user?.userName}
              </button>
            ) : (
              <button
                type="button"
                className="header__btn"
                onClick={signInState}
              >
                Sign In
              </button>
            )}
          </li>
          {isLoggedIn && (
            <li className="header__item">
              <button className="header__btn header__logged_in" type="button">
                <i className="fas fa-shopping-cart" />
                <span>0</span>
              </button>
            </li>
          )}
          <li className="header__item">
            {isLoggedIn ? (
              <button type="button" onClick={logOut} className="header__btn">
                <i className="fas fa-door-open" />
              </button>
            ) : (
              <button
                type="button"
                className="header__btn"
                onClick={signUpState}
              >
                Sign Up
              </button>
            )}
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
