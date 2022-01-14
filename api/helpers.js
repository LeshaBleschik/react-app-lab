import fs from "fs"
import multer from "multer"
import { GAMES_FILE_NAME, USERS_FILE_NAME } from "./constants.js"

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`)
  },
})

export const upload = multer({ storage: fileStorage })

export const readFile = (filename) =>
  JSON.parse(fs.readFileSync(filename, "utf-8"))

export const writeFile = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))

export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const createGameRating = (num) => {
  const starsArr = []
  for (let i = 0; i < num; i++) {
    starsArr.push("filled-star")
  }
  for (let k = starsArr.length; k < 5; k++) {
    starsArr.push("empty-star")
  }
  return starsArr
}

export const getGames = () => readFile(GAMES_FILE_NAME)
export const currentData = () => readFile(USERS_FILE_NAME)
