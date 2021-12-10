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
  const listOfGames = getGames()
  let searchQuery = req.query.search?.toLowerCase()
  const categoryQuery = req.query.category
  const filteredByCategory = listOfGames.filter((game) =>
    game.category.includes(categoryQuery)
  )
  if (!searchQuery && !categoryQuery) {
    return res.send(listOfGames)
  }
  if (searchQuery === undefined) {
    searchQuery = ""
  }
  if (searchQuery && !categoryQuery) {
    return res.send(
      listOfGames.filter((game) =>
        game.title.toLowerCase().includes(searchQuery)
      )
    )
  }
  if (categoryQuery && searchQuery) {
    return res.send(
      filteredByCategory.filter((game) =>
        game.title.toLowerCase().includes(searchQuery)
      )
    )
  }
  if (categoryQuery) {
    return res.send(filteredByCategory)
  }
})

export default router
