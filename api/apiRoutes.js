import express from "express"
import { getGames, writeFile, currentData } from "./helpers.js"

const router = express.Router()
const currentUserData = currentData()

router.get("/get-top-products", (req, res) => {
  const games = getGames()
  const gamesSortedByDate = games
    .sort((a, b) => a.releaseDate - b.releaseDate)
    .slice(0, 3)
  return res.send(gamesSortedByDate)
})

// GAME PRODUCTS LIST
router.get(`/products`, (req, res) => {
  let listOfGames = getGames()
  const searchQuery = req.query.search?.toLowerCase() || ""
  const categoryQuery = req.query.category
  if (categoryQuery) {
    listOfGames = listOfGames.filter((game) =>
      game.category.includes(categoryQuery)
    )
  }
  if (searchQuery) {
    listOfGames = listOfGames.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    )
  }
  res.send(listOfGames)
})

// SIGN_IN
router.post("/auth/sign-in", (req, res) => {
  const { userName, password } = req.body
  // eslint-disable-next-line no-unused-expressions
  currentUserData[userName] === password
    ? res.sendStatus(201)
    : res.sendStatus(400)
})

// REGISTRATION
router.put("/auth/registration", (req, res) => {
  const { regUserName, regPassword } = req.body
  const userData = { [regUserName]: regPassword }
  if (currentUserData[regUserName]) {
    res.sendStatus(400)
  } else {
    writeFile("users.json", { ...currentUserData, ...userData })
    res.sendStatus(200)
  }
})

export default router
