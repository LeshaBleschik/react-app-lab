import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"

type UserLog = {
  userName: string
} | null

type AuthContextType = {
  user: UserLog
  setUser: React.Dispatch<React.SetStateAction<UserLog>>
  isLoggedIn: boolean
  signInIsOpen: boolean
  signUpIsOpen: boolean
  signInOpenClick: () => void
  signInOnClose: () => void
  signUpOpenClick: () => void
  signUpOnClose: () => void
  logInSetter: () => void
  logOutSetter: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [signInIsOpen, setSignInIsOpen] = useState<boolean>(false)
  const [signUpIsOpen, setSignUpIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserLog>(null)

  const signInOpenClick = () => {
    setSignInIsOpen(true)
  }

  const signInOnClose = () => {
    setSignInIsOpen(false)
  }

  const signUpOpenClick = () => {
    setSignUpIsOpen(true)
  }

  const signUpOnClose = () => {
    setSignUpIsOpen(false)
  }

  const logInSetter = () => {
    setIsLoggedIn(true)
  }

  const logOutSetter = () => {
    setIsLoggedIn(false)
  }

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      isLoggedIn,
      signInIsOpen,
      signUpIsOpen,
      signInOpenClick,
      signInOnClose,
      signUpOpenClick,
      signUpOnClose,
      logInSetter,
      logOutSetter,
    }),
    [setUser, logInSetter]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
