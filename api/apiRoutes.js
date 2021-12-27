import express from "express"
import { v4 as uuidv4 } from "uuid"
import { getGames, writeFile, currentData, upload } from "./helpers.js"

const router = express.Router()
const currentUserData = currentData()
const userId = uuidv4()

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
