import express from "express"
import { v4 as uuidv4 } from "uuid"
import {
  getGames,
  writeFile,
  currentData,
  upload,
  randomInteger,
  createGameRating,
} from "./helpers.js"

const router = express.Router()
const currentUserData = currentData()
const userId = uuidv4()

router.get("/get-top-products", (req, res) => {
  const games = getGames()
  const gamesSortedByDate = games
    .sort((a, b) => a.releaseDate - b.releaseDate)
    .slice(0, 3)
  res.send(gamesSortedByDate)
})

// GAME PRODUCTS LIST
router.get(`/products`, (req, res) => {
  let listOfGames = getGames()
  const { category, search, sortType, sortDir, genre, age } = req.query
  if (category) {
    listOfGames = listOfGames.filter((game) => game.category.includes(category))
  }
  if (search) {
    listOfGames = listOfGames.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase() || "")
    )
  }
  if (sortDir === "Asc" || sortDir === "Desc") {
    const k = sortDir === "Asc" ? 1 : -1
    if (sortType === "rating") {
      listOfGames = listOfGames.sort(
        (a, b) =>
          a.rating.filter((star) => star === "filled-star").length * k -
          b.rating.filter((star) => star === "filled-star").length * k
      )
    }
    if (sortType === "price") {
      listOfGames = listOfGames.sort(
        (a, b) => parseFloat(a.price) * k - parseFloat(b.price) * k
      )
    }
    if (sortType === "date") {
      listOfGames = listOfGames.sort(
        (a, b) => a.releaseDate * k - b.releaseDate * k
      )
    }
  }
  if (genre) {
    listOfGames = listOfGames.filter((game) =>
      game.genre.toLowerCase().includes(genre)
    )
  }
  if (age) {
    listOfGames = listOfGames.filter((game) => game.ageAllowed === +age)
  }
  res.send(listOfGames)
})

// CREATE NEW GAME
router.post(`/products`, (req, res) => {
  const listOfGames = getGames()
  const { title, image, price, description, age, rating, genre, category } =
    req.body
  const newGame = {
    id: listOfGames.length + 1,
    title,
    category,
    imgSrc: image,
    price,
    description,
    ageAllowed: +age,
    releaseDate: randomInteger(1350000000000, 1400000000000),
    rating: createGameRating(rating),
    genre,
  }
  writeFile("games.json", [...listOfGames, newGame])
  res.status(200).send(getGames())
})

// DELETE GAME
router.delete(`/products/:id`, (req, res) => {
  let listOfGames = getGames()
  const { id } = req.params
  listOfGames = listOfGames.filter((game) => game.id !== +id)
  writeFile("games.json", [...listOfGames])
  res.status(200).send(getGames())
})

// MODIFY GAME
router.put(`/products`, (req, res) => {
  const listOfGames = getGames()
  const { title, image, price, description, age, genre, category, id } =
    req.body
  const foundGame = listOfGames.find((game) => game.id === id)
  if (foundGame) {
    foundGame.title = title
    foundGame.imgSrc = image
    foundGame.price = price
    foundGame.description = description
    foundGame.ageAllowed = +age
    foundGame.genre = genre
    foundGame.category = category
  }
  writeFile("games.json", [...listOfGames])
  res.status(200).send(getGames())
})

// REGISTRATION
router.put("/auth/registration", (req, res) => {
  const { regUserName, regPassword } = req.body
  const existingUser = currentUserData.filter((user) =>
    user.userName.includes(regUserName)
  )
  const userData = {
    userName: regUserName,
    password: regPassword,
    tokens: [],
    fields: "",
  }
  if (existingUser.length) {
    res.sendStatus(400)
  } else {
    writeFile("users.json", [...currentUserData, { ...userData }])
    res.sendStatus(200)
  }
})

// SIGN_IN
router.post("/auth/sign-in", (req, res) => {
  const { userName, password } = req.body
  const actualUserDb = currentData()
  const signedUser = actualUserDb.find((user) => user.userName === userName)
  if (!signedUser.tokens.length) {
    signedUser.tokens.push(userId)
  }
  const userPassword = signedUser.password
  // eslint-disable-next-line no-unused-expressions
  userPassword === password
    ? res.status(201).send(signedUser)
    : res.sendStatus(400)
  writeFile("users.json", [...actualUserDb])
})

// SEND USER DATA DEPENDING ON TOKEN
router.post("/getProfile", (req, res) => {
  const { token } = req.body
  const userFilteredByToken = currentUserData.filter((user) =>
    user.tokens.includes(token)
  )
  res.send(...userFilteredByToken)
})

// DELETE TOKEN
router.patch("/deleteToken", (req, res) => {
  const { userName } = req.body
  const removeUserToken = currentUserData.find(
    (user) => user.userName === userName
  )
  if (removeUserToken.tokens?.length) {
    removeUserToken.tokens = []
  }
  writeFile("users.json", [...currentUserData])
})

// CHANGE PASSWORD
router.post("/changePassword", (req, res) => {
  const { userName, password } = req.body
  const userFilteredByName = currentUserData.find(
    (user) => user.userName === userName
  )
  if (password) {
    userFilteredByName.password = password
  }
  writeFile("users.json", [...currentUserData])
  res.send(userFilteredByName)
})

// CHANGE USER INFO
router.post("/saveProfile", (req, res) => {
  const { userName, newName, fields } = req.body
  const currentUserName = currentUserData.find(
    (user) => user.userName === userName
  )
  if (userName) {
    currentUserName.userName = newName
    currentUserName.fields = fields
  }

  writeFile("users.json", [...currentUserData])
  res.send(currentUserName)
})

// SAVE PROFILE IMAGE
router.post("/saveImage", upload.single("image"), (req, res) => {
  const { user } = req.body
  const imgType = req.file.mimetype.split("/")[1]
  const validTypes = ["jpeg", "png", "jpg"]
  const dbUser = currentUserData.find(
    (singleUser) => singleUser.userName === user
  )
  if (!validTypes.includes(imgType)) {
    res.sendStatus(400)
  } else {
    dbUser.image = `images\\${req.file.filename}`
    writeFile("users.json", [...currentUserData])
    res.send(dbUser)
  }
})

export default router
