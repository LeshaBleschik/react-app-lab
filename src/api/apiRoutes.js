import express from "express"
import { getGames } from "./helpers.js"

const router = express.Router()

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
  let filteredByCategory
  if (categoryQuery) {
    filteredByCategory = listOfGames.filter((game) =>
      game.category.includes(categoryQuery)
    )
  }
  if (searchQuery && !categoryQuery) {
    listOfGames = listOfGames.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    )
  } else if (categoryQuery && searchQuery) {
    listOfGames = filteredByCategory.filter((game) =>
      game.title.toLowerCase().includes(searchQuery)
    )
  } else if (categoryQuery) {
    listOfGames = filteredByCategory
  }
  res.send(listOfGames)
})

export default router
