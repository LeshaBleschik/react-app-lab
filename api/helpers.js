import fs from "fs"
import { GAMES_FILE_NAME, USERS_FILE_NAME } from "./constants.js"

export const readFile = (filename) =>
  JSON.parse(fs.readFileSync(filename, "utf-8"))

export const writeFile = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data, null, 2))

export const getGames = () => readFile(GAMES_FILE_NAME)
export const currentData = () => readFile(USERS_FILE_NAME)