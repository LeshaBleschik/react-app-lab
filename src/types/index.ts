export type Game = {
  title: string
  id: number
  price: string
  imgSrc: string
  description: string
  ageAllowed: string
  category: string[]
  rating: string[]
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
