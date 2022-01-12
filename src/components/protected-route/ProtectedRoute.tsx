import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getUserSelector } from "redux/selectors"

type RouteProps = {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: RouteProps) => {
  const user = useSelector(getUserSelector)
  const navigate = useNavigate()
  if (!user) {
    navigate("/", { replace: true })
  }
  return <div>{children}</div>
}

export default ProtectedRoute
