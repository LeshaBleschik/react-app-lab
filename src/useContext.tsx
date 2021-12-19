/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, ReactNode, useContext, useState } from "react"
import axios from "axios"
import { REGISTRATION, SIGN_IN } from "api/constants"

type UserLog = {
  userName: string
} | null

type AuthContextType = {
  user: UserLog
  setUser: React.Dispatch<React.SetStateAction<UserLog>>
  isLoggedIn: boolean
  signIn: (userData: SignInData) => Promise<boolean>
  registration: (userData: SignUpData) => Promise<boolean>
  logOutSetter: () => void
}

type SignUpData = {
  regUserName: string
  regPassword: string
  regRepeatPassword: string
  isRegistrated?: string
}

type SignInData = {
  userName: string
  password: string
  signInError?: string
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [user, setUser] = useState<UserLog>(null)
  const isLoggedIn = !!user

  const logOutSetter = () => {
    setUser(null)
  }

  const signIn = async (userData: SignInData) => {
    try {
      const response = await axios.post(SIGN_IN, userData)
      if (response.status === 201) {
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const registration = async (userData: SignUpData) => {
    try {
      const response = await axios.put(REGISTRATION, userData)
      if (response.status === 200) {
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        signIn,
        registration,
        logOutSetter,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
