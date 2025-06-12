import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useSelector(state => state.auth)

  if (!isAuthenticated || !user || !user.uid) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute