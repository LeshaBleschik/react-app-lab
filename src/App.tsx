import React, { useEffect, useState } from "react"
import axios from "axios"
import { GET_PROFILE, GET_TOP_PRODUCTS } from "api/constants"
import {
  HOME_PAGE,
  ABOUT_PAGE,
  WRONG_PATH,
  PRODUCTS_PAGE,
  PROFILE_PAGE,
  CART_PAGE,
} from "routes"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { Game } from "types"
import { useDispatch } from "react-redux"
import { setUser } from "redux/actions"
// eslint-disable-next-line import/no-named-as-default-member
import Modal from "components/modal/Modal"
import CartPage from "pages/cart-page/CartPage"
import ProtectedRoute from "components/protected-route/ProtectedRoute"
import Profile from "pages/profile-page/Profile"
import SearchBar from "components/search-bar/SearchBar"
import ProductsPage from "pages/product-page/ProductsPage"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Footer from "./components/footer/Footer"

const App = () => {
  const [games, setGames] = useState<Game[]>([])
  const [signInIsOpen, setSignInIsOpen] = useState<boolean>(false)
  const [signUpIsOpen, setSignUpIsOpen] = useState(false)
  const [passwordIsOpen, setPasswordIsOpen] = useState(false)
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("userToken")
    const userToken = token ? JSON.parse(token) : null
    if (userToken) {
      axios
        .post(GET_PROFILE, { token: userToken })
        .then((response) => {
          dispatch(setUser(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const signInOpenClick = () => {
    setSignInIsOpen(true)
  }

  const signInOnClose = () => {
    setSignInIsOpen(false)
  }

  const signUpOpenClick = () => {
    setSignUpIsOpen(true)
  }

  const signUpOnClose = () => {
    setSignUpIsOpen(false)
  }

  const passwordClickToggle = () => {
    setPasswordIsOpen(!passwordIsOpen)
  }

  const confirmWindowToggle = () => {
    setConfirmIsOpen(!confirmIsOpen)
  }

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
      <Header
        signInOpenClick={signInOpenClick}
        signUpOpenClick={signUpOpenClick}
      />
      <div className="content-wrapper">
        <SearchBar />
        <Modal
          signInIsOpen={signInIsOpen}
          signInOnClose={signInOnClose}
          signUpIsOpen={signUpIsOpen}
          signUpOnClose={signUpOnClose}
          passwordIsOpen={passwordIsOpen}
          passwordClickToggle={passwordClickToggle}
          confirmIsOpen={confirmIsOpen}
          confirmWindowToggle={confirmWindowToggle}
        />
        <Routes>
          <Route path={HOME_PAGE} element={<Home games={games} />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={PRODUCTS_PAGE} element={<ProductsPage />} />
          <Route path={WRONG_PATH} element={<Navigate to={HOME_PAGE} />} />
          <Route
            path={PROFILE_PAGE}
            element={
              <ProtectedRoute>
                <Profile passwordClickToggle={passwordClickToggle} />
              </ProtectedRoute>
            }
          />
          <Route
            path={CART_PAGE}
            element={<CartPage confirmWindowToggle={confirmWindowToggle} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
