import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import InitialBalance from './components/balance/InitialBalance'
import CategoryList from './components/categories/CategoryList'
import CreateCategory from './components/categories/CreateCategory'
import ExpenseEntry from './components/expenses/ExpenseEntry'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Inicio from './components/Inicio'
import Resumen from './components/Resumen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/initial-balance" 
          element={
            <ProtectedRoute>
              <InitialBalance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-category" 
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/expense/:categoryId" 
          element={
            <ProtectedRoute>
              <ExpenseEntry />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inicio" 
          element={
            <ProtectedRoute>
              <Inicio />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resumen" 
          element={
            <ProtectedRoute>
              <Resumen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App