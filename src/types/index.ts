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
