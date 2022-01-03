import React, { useEffect, useState } from "react"
import axios from "axios"
import { GET_PROFILE, GET_TOP_PRODUCTS } from "api/constants"
import {
  HOME_PAGE,
  ABOUT_PAGE,
  WRONG_PATH,
  PRODUCTS_PAGE,
  PROFILE_PAGE,
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
import ProtectedRoute from "components/protected-route/ProtectedRoute"
import Profile from "pages/profile-page/Profile"
import ChangePassword from "components/change-password/ChangePassword"
import SignIn from "components/sign-in/SignIn"
import Registration from "components/registration/Registration"
import Modal from "components/modal/Modal"
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
        <Modal signInIsOpen={signInIsOpen} signInOnClose={signInOnClose}>
          <SignIn signInOnClose={signInOnClose} />
        </Modal>
        <Modal signUpIsOpen={signUpIsOpen} signUpOnClose={signUpOnClose}>
          <Registration signUpOnClose={signUpOnClose} />
        </Modal>
        <Modal
          passwordIsOpen={passwordIsOpen}
          passwordClickToggle={passwordClickToggle}
        >
          <ChangePassword passwordClickToggle={passwordClickToggle} />
        </Modal>
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
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
