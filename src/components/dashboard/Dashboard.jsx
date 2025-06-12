import React from 'react'
import { useSelector } from 'react-redux'
import CategoryManager from '../categories/CategoryManager'
import ExpenseForm from '../expenses/ExpenseForm'
import ExpenseAnalysis from '../analysis/ExpenseAnalysis'
import DataExport from '../utils/DataExport'

function Dashboard() {
  const user = useSelector(state => state.auth.user)
  const balance = useSelector(state => state.expenses.balance)
  const expenses = useSelector(state => state.expenses.expenses)

  if (!user || !user.uid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-red-600 font-semibold mb-4">Debes iniciar sesión para ver el dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenido, {user.usuario}</p>
        </div>
        
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Balance Actual</h2>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>

        {/* Expense Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ExpenseAnalysis />
        </div>

        {/* Category Manager */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CategoryManager />
        </div>

        {/* Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ExpenseForm />
        </div>

        {/* Data Export */}
        <div className="mt-6">
          <DataExport />
        </div>
      </div>
    </div>
  )
}

export default Dashboard