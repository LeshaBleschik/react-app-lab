import fs from "fs"
import { GAMES_FILE_NAME } from "./constants.js"

export const readFile = (filename) =>
  JSON.parse(fs.readFileSync(filename, "utf-8"))

export const writeFile = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data))

let dataG = [
  {
    id: 1,
    title: "Rocket League",
    category: ["ps", "pc"],
    imgSrc:
      "https://i.pinimg.com/564x/3b/f7/c6/3bf7c6a4d52505ede9e3582480d62545.jpg",
    price: "$23.34",
    description:
      "Rocket League is a video game that involves the combination of car racing and soccer, created and developed by Psyonix Studios. In the game, two teams of players are pitted against each other in a futuristic arena to duke it out in five-minute matches.",
    ageAllowed: "10+",
    releaseDate: 1356987600000,
  },
  {
    id: 2,
    category: ["xbox", "ps", "pc"],
    title: "Grand Theft Auto V",
    imgSrc:
      "https://i.pinimg.com/564x/9a/83/71/9a83710f141c4977af1b4630546f2f1d.jpg",
    price: "$29.99",
    description:
      "Grand Theft Auto V is an action adventure game played from either a third-person or first person perspective. Players complete missions linear scenarios with set objectives to progress through the story. Outside of the missions, players may freely roam the open world.",
    ageAllowed: "17+",
    releaseDate: 1357074000000,
  },
  {
    id: 3,
    category: [],
    title: "Apex Legends",
    imgSrc:
      "https://i.pinimg.com/564x/a2/60/3a/a2603a2e81105cb1f6b5e39f77fdf953.jpg",
    price: "$19.99",
    description:
      "Apex Legends is a free-to-play battle royale-hero shooter game developed by Respawn Entertainment and published by Electronic Arts. It was released for Microsoft Windows, PlayStation 4, and Xbox One in February 2019, and for Nintendo Switch in March 2021. The game supports cross-platform play.",
    ageAllowed: "14+",
    releaseDate: 1388610000000,
  },
]

let titles = {
  title: [
    "",
    "",
    "",
    "",
    "Pokémon Go",
    "Borderlands 2",
    "Divinity: Original Sin 2",
    "Dishonored",
    "Final Fantasy VII",
    "Assassin's Creed IV: Black Flag",
    "Monkey Island 2: LeChuck's Revenge",
    "Burnout 3: Takedown",
    "Fallout 2",
    "Undertale",
    "League of Legends",
    "Mega Man 3",
    "Soulcalibur",
    "Thief II",
    "Metal Age",
    "SimCity 2000",
    "Inside",
    "Tony Hawk's Pro Skater 2",
    "Monster Hunter: World",
    "Resident Evil 2",
    "System Shock 2",
    "Grand Theft Auto: Vice City",
    "Persona 5",
    "Fortnite",
    "Fable 2",
    "GoldenEye 007",
    "Super Smash Bros. Ultimate",
    "The Elder Scrolls V: Skyrim",
    "X-COM: UFO Defense",
    "Suikoden II",
    "Battlefield 1942",
    "Dota 2",
    "Mario Kart 8 Deluxe",
    "Star Wars Jedi Knight II: Jedi Outcast",
    "Spelunky",
    "Donkey Kong",
    "The Sims",
    "Rock Band",
    "Red Dead Redemption 2",
    "Splinter Cell: Chaos Theory",
    "Super Mario World 2: Yoshi's Island",
    "Silent Hill 2",
    "Grand Theft Auto: San Andreas",
    "Mass Effect",
    "Call of Duty 4: Modern Warfare",
    "Rise of the Tomb Raider",
    "Batman: Arkham City",
    "The Witness",
    "Journey",
    "Uncharted 2: Among Thieves",
    "Overwatch",
    "Deus Ex",
    "Baldur's Gate II: Shadows of Amn",
    "Ms. Pac-Man",
    "Counter-Strike 1.6",
    "Left 4 Dead 2",
    "EarthBound",
    "Resident Evil",
    "Diablo II",
    "StarCraft",
    "World of Warcraft",
    "Star Wars: Knights of the Old Republic",
    "Fallout: New Vegas",
    "Final Fantasy VI",
    "Mass Effect 2",
    "Pokémon Yellow",
    "Bloodborne",
    "Metroid Prime",
    "Resident Evil 4",
    "Shadow of the Colossus",
    "Metal Gear Solid",
    "God of War",
    "The Witcher 3: Wild Hunt",
    "BioShock",
    "Sid Meier's Civilization IV",
    "The Legend of Zelda: Ocarina of Time",
    "Minecraft",
    "Halo: Combat Evolved",
    "Half-Life",
    "Metal Gear Solid 3: Snake Eater",
    "The Last of Us",
    "Doom",
    "Chrono Trigger",
    "Portal",
    "Dark Souls",
    "Street Fighter II",
    "Super Mario Bros.",
    "Halo 2",
    "Castlevania: Symphony of the Night",
    "Grand Theft Auto V",
    "Super Mario 64",
    "Red Dead Redemption",
    "Half-Life 2",
    "Tetris",
    "Super Mario Bros. 3",
    "The Legend of Zelda: Breath of the Wild",
    "Super Metroid",
    "Portal 2",
    "The Legend of Zelda: A Link to the Past",
    "Super Mario World",
  ],
}

let category = ["xbox", "ps", "pc"]
function fillCategoty(arr) {
  let random = Math.floor(Math.random() * 4)
  if (random === 3) {
    return []
  }
  return [arr[random]]
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function fillSrc(arr) {
  let random = Math.floor(Math.random() * arr.length)
  return imgSrc[random]
}

const imgSrc = [
  "https://i.pinimg.com/564x/3b/f7/c6/3bf7c6a4d52505ede9e3582480d62545.jpg",
  "https://i.pinimg.com/564x/9a/83/71/9a83710f141c4977af1b4630546f2f1d.jpg",
  "https://i.pinimg.com/564x/a2/60/3a/a2603a2e81105cb1f6b5e39f77fdf953.jpg",
  "https://i.pinimg.com/564x/16/cd/2b/16cd2b9754498971e80a53c3925c7c97.jpg",
  "https://i.pinimg.com/564x/4e/e4/b4/4ee4b45963b6e6b84b8c1a02eebb7fdd.jpg",
  "https://i.pinimg.com/564x/ad/ba/a4/adbaa41b81502bad7de3c24727d19560.jpg",
]

for (let i = 4; i < 105; i++) {
  let b = {
    id: i,
    category: fillCategoty(category),
    title: "",
    imgSrc: fillSrc(imgSrc),
    price: `$${randomInteger(15, 50)}.${randomInteger(10, 99)}`,
    description:
      "Mauris suscipit dui eu elit pellentesque ornare. Etiam arcu quam, pulvinar ac lorem eget, placerat semper arcu. Suspendisse maximus dui non convallis faucibus. Nam enim erat, aliquam at iaculis consequat, consequat eget purus.",
    ageAllowed: `${randomInteger(8, 18)}+`,
    releaseDate: randomInteger(1350000000000, 1400000000000),
  }
  b.title = titles.title[i]
  dataG.push(b)
}

export const gamesData = () => writeFile("games.json", dataG)
export const getGames = () => readFile(GAMES_FILE_NAME)
