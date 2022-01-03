export type Game = {
  title: string
  id: number
  price: string
  imgSrc: string
  description: string
  ageAllowed: string
}

export type User = {
  userName: string
  password: string
} | null

export type UserPayload = {
  userName: string
  tokens?: string
  fields?: [string]
  password: string
  image?: string
}

export type UserAction = {
  type: string
  payload?: UserPayload
}
