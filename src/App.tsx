import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ABOUT_PAGE,
  PRODUCT_PC_GAMES_PAGE,
  PRODUCT_PLAYSTATION_5_GAMES_PAGE,
  PRODUCT_XBOX_ONE_GAMES_PAGE,
  WRONG_PATH,
  GET_TOP_PRODUCTS,
} from "routes"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { Game } from "types"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import SignIn from "./pages/sign in/SignIn"
import SignUp from "./pages/sign up/SignUp"
import Pc from "./pages/products/pc/Pc"
import Playstation from "./pages/products/playstation/Playstation"
import Xbox from "./pages/products/xbox/Xbox"
import Footer from "./components/footer/Footer"

const App = () => {
  const [games, setGames] = useState<Game[]>([])
  useEffect((): void => {
    axios
      .get<Game[]>(GET_TOP_PRODUCTS)
      .then((response) => {
        console.log(response.data)
        setGames(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="main_wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path={HOME_PAGE} element={<Home games={games} />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={PRODUCT_PC_GAMES_PAGE} element={<Pc />} />
          <Route
            path={PRODUCT_PLAYSTATION_5_GAMES_PAGE}
            element={<Playstation />}
          />
          <Route path={PRODUCT_XBOX_ONE_GAMES_PAGE} element={<Xbox />} />
          <Route path={SIGN_IN_PAGE} element={<SignIn />} />
          <Route path={SIGN_UP_PAGE} element={<SignUp />} />
          <Route path={WRONG_PATH} element={<Navigate to={HOME_PAGE} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
