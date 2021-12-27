import { RootStateOrAny, useSelector } from "react-redux"
import { useNavigate } from "react-router"

type RouteProps = {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: RouteProps) => {
  const user = useSelector((state: RootStateOrAny) => state.user)
  const navigate = useNavigate()
  if (!user) {
    navigate("/", { replace: true })
  }
  return <div>{children}</div>
}

export default ProtectedRoute
