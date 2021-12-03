import express from "express"
const router = express.Router()

const topProducts = [
  {
    id: 1,
    title: "Rocket League",
    imgSrc: "../images/rocket league.jpgs",
    price: "$23.34",
    description:
      "Rocket League is a video game that involves the combination of car racing and soccer, created and developed by Psyonix Studios. In the game, two teams of players are pitted against each other in a futuristic arena to duke it out in five-minute matches.",
    ageAllowed: "10+",
  },
  {
    id: 2,
    title: "Grand Theft Auto V",
    imgSrc: "../images/grand the auto.jpg",
    price: "$29.99",
    description:
      "Grand Theft Auto V is a video game developed by Rockstar North. It is the fifteenth installment in the Grand Theft Auto series and the fifth game in the HD Universe title of the series. Grand Theft Auto V is set circa 2013 in the city of Los Santos and its surrounding areas and tells the stories of three protagonists: Michael De Santa, Franklin Clinton, and Trevor Philips.",
    ageAllowed: "17+",
  },
  {
    id: 3,
    title: "Apex Legends",
    imgSrc: "../images/apex.jpg",
    price: "$19.99",
    description:
      "Apex Legends is a free-to-play battle royale-hero shooter game developed by Respawn Entertainment and published by Electronic Arts. It was released for Microsoft Windows, PlayStation 4, and Xbox One in February 2019, and for Nintendo Switch in March 2021. A mobile version of the game specially designed for touchscreens titled Apex Legends Mobile has also been announced which is scheduled to be fully released by 2022 on Android and iOS. The game supports cross-platform play.",
    ageAllowed: "14+",
  },
]

router.get("/get-top-products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(topProducts)
})

export default router
