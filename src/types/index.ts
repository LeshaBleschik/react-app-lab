export type Game = {
  title: string
  id: number
  price: string
  imgSrc: string
  description: string
  ageAllowed: string
  category: string[]
  rating: string[]
  genre: string
}

export type User = {
  userName: string
  password: string
} | null

export type UserData = {
  userName: string
  tokens?: string
  fields?: [string]
  password: string
  image?: string
}

export type UserAction = {
  type: string
  payload?: UserData
}

export type CartData = {
  id: number
  name: string
  platform: string[]
  price: number
  amount: number
}

export type GameInfo = {
  name: string
  image: string
  genre: string
  price: string
  description: string
  age: string
  category: string[]
}

export type Action = {
  type: string
}

export type Card = {
  id?: number
  title: string
  image: string
  price: string
  description: string
  age: string
  rating: string
  genre: string
  category: string[]
}
