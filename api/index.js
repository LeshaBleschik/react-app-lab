import express from "express"
import bodyParser from "body-parser"
import apiRouter from "./apiRoutes.js"

const app = express()
const PORT = 5000

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  )
  next()
})

app.options("/*", (_, res) => {
  res.sendStatus(200)
})

app.use(bodyParser.json())
app.use("/api", apiRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.log("something whent wrong, try it again")
  }
  console.log(`The server has started on port http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
  res.send("Server is spinning")
})
