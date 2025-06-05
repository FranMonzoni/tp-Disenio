import React from 'react'
import { useSelector } from 'react-redux'
import CategoryManager from '../categories/CategoryManager'
import ExpenseForm from '../expenses/ExpenseForm'
import ExpenseAnalysis from '../analysis/ExpenseAnalysis'
import DataExport from '../utils/DataExport'

function Dashboard() {
  const balance = useSelector(state => state.expenses.balance)
  const expenses = useSelector(state => state.expenses.expenses)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Balance Actual</h2>
          <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
        </div>

        {/* Expense Analysis */}
        <ExpenseAnalysis />

        {/* Expense Form */}
        <ExpenseForm />

        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gastos Recientes</h2>
          {expenses.length > 0 ? (
            <div className="space-y-3">
              {expenses.map(expense => (
                <div key={expense.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-red-600 font-semibold">-${expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay gastos registrados</p>
          )}
        </div>

        {/* Category Manager */}
        <CategoryManager />

        {/* Data Export */}
        <DataExport />
      </div>
    </div>
  )
}

export default Dashboard