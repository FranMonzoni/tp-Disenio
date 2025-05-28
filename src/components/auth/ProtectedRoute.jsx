import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // Por ahora, simularemos la autenticación. Más adelante implementaremos la lógica real
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute