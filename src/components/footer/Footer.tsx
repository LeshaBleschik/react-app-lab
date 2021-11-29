import React from "react"
import "./footer.scss"

const Footer = () => (
  <footer className="footer">
    <h4 className="footer__title">Incredible conveniet</h4>
    <nav className="footer__nav">
      <ul className="footer__list">
        <li className="footer__item">
          <a
            href="https://www.epicgames.com/site/en-US/home"
            aria-label="epicgames.com"
            className="footer__link"
          >
            <img
              src="../images/icons8-epic-games-50.png"
              alt="epic games logo"
              className="footer__icon"
            />
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://www.playstation.com/en-us/"
            aria-label="playstation.com"
            className="footer__link"
          >
            <img
              src="../images/icons8-playstation-50.png"
              alt="sony playstation logo"
              className="footer__icon"
            />
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://www.ubisoft.com/ru-ru/"
            aria-label="ubisoft.com"
            className="footer__link"
          >
            <img
              src="../images/icons8-ubisoft-48.png"
              alt="ubisoft logo"
              className="footer__icon"
            />
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://www.xbox.com/ru-RU"
            aria-label="xbox.com"
            className="footer__link"
          >
            <img
              src="../images/icons8-xbox-50.png"
              alt="x-box logo"
              className="footer__icon"
            />
          </a>
        </li>
        <li className="footer__item">
          <a
            href="https://www.nintendo.ru"
            aria-label="nintendo.ru"
            className="footer__link"
          >
            <img
              src="../images/icons8-nintendo-50.png"
              alt="nintendo logo"
              className="footer__icon"
            />
          </a>
        </li>
      </ul>
    </nav>
  </footer>
)

export default Footer
