import React from "react"
import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ABOUT_PAGE,
  PRODUCT_GAMES_PAGE,
  PRODUCT_CONSOLES_PAGE,
  PRODUCT_ACCESSORIES_PAGE,
  WRONG_PATH,
} from "routes"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import SignIn from "./pages/sign in/SignIn"
import SignUp from "./pages/sign up/SignUp"
import Consoles from "./pages/products/conosles/Consoles"
import Games from "./pages/products/games/Games"
import GameAccessories from "./pages/products/game accessories/GameAccessories"
import Footer from "./components/footer/Footer"

const App = () => (
  <div>
    <Router>
      <Header />
      <Routes>
        <Route path={HOME_PAGE} element={<Home />} />
        <Route path={ABOUT_PAGE} element={<About />} />
        <Route path={PRODUCT_GAMES_PAGE} element={<Games />} />
        <Route path={PRODUCT_CONSOLES_PAGE} element={<Consoles />} />
        <Route path={PRODUCT_ACCESSORIES_PAGE} element={<GameAccessories />} />
        <Route path={SIGN_IN_PAGE} element={<SignIn />} />
        <Route path={SIGN_UP_PAGE} element={<SignUp />} />
        <Route path={WRONG_PATH} element={<Home />} />
      </Routes>
    </Router>
    <Footer />
  </div>
)

export default App
