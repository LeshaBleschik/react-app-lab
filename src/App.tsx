import React, { useEffect, useState } from "react"
import axios from "axios"
import { GET_TOP_PRODUCTS } from "api/constants"
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
import Profile from "pages/profile-page/Profile"
import SignIn from "components/sign-in/SignIn"
import Registration from "components/registration/Registration"
import Modal from "components/modal/Modal"
import SearchBar from "components/search-bar/SearchBar"
import ProductsPage from "pages/product-page/ProductsPage"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Footer from "./components/footer/Footer"
import useAuth, { AuthProvider } from "./useContext"

function InnerApp() {
  const [games, setGames] = useState<Game[]>([])
  const { signInIsOpen, signUpIsOpen, signInOnClose, signUpOnClose } = useAuth()

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
        <Modal signInIsOpen={signInIsOpen} signInOnClose={signInOnClose}>
          <SignIn />
        </Modal>
        <Modal signUpIsOpen={signUpIsOpen} signUpOnClose={signUpOnClose}>
          <Registration />
        </Modal>
        <Routes>
          <Route path={HOME_PAGE} element={<Home games={games} />} />
          <Route path={ABOUT_PAGE} element={<About />} />
          <Route path={PRODUCTS_PAGE} element={<ProductsPage />} />
          <Route path={WRONG_PATH} element={<Navigate to={HOME_PAGE} />} />
          <Route path={PROFILE_PAGE} element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

const App = () => (
  <AuthProvider>
    <InnerApp />
  </AuthProvider>
)

export default App
