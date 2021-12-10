import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  HOME_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
  ABOUT_PAGE,
  WRONG_PATH,
  GET_TOP_PRODUCTS,
  PRODUCTS_PAGE,
} from "routes"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { Game } from "types"
import SearchBar from "components/search-bar/SearchBar"
import ProductsPage from "pages/product-page/ProductsPage"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import SignIn from "./pages/sign-in/SignIn"
import SignUp from "./pages/sign-up/SignUp"
import Footer from "./components/footer/Footer"

const App = () => {
  const [games, setGames] = useState<Game[]>([])
  useEffect((): void => {
    axios
      .get<Game[]>(GET_TOP_PRODUCTS)
      .then((response) => {
        setGames(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Router>
      <Header />
      <div className="content-wrapper">
        <SearchBar />
        <Routes>
          <Route path={HOME_PAGE} element={<Home games={games} />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={PRODUCTS_PAGE} element={<ProductsPage />} />
          <Route path={SIGN_IN_PAGE} element={<SignIn />} />
          <Route path={SIGN_UP_PAGE} element={<SignUp />} />
          <Route path={WRONG_PATH} element={<Navigate to={HOME_PAGE} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
