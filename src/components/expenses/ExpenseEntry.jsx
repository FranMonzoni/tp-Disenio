import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { addExpense } from '../../features/expenses/expenseSlice'
import { Pie } from 'react-chartjs-2'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BotonInicio from '../BotonInicio'
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseEntry() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { categories = [], customCategories = [], balance = 0, currency = '', expenses = [] } = useSelector(state => state.expenses || {})
  const allCategories = [...categories, ...customCategories]
  const currentCategory = allCategories.find(cat => cat.id === categoryId)

  const [expenseName, setExpenseName] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calcular el porcentaje de gastos por categoría
  const categoryExpenses = expenses.filter(exp => exp.categoryId === categoryId)
  const categoryTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const categoryPercentage = balance > 0 ? (categoryTotal / balance) * 100 : 0

  const chartData = {
    labels: ['Categoría actual', 'Resto'],
    datasets: [{
      data: [categoryPercentage, 100 - categoryPercentage],
      backgroundColor: ['#4CAF50', '#E0E0E0']
    }]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !user.uid) {
      setError('Debes iniciar sesión para registrar un gasto.')
      return
    }
    if (!expenseName.trim() || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Todos los campos son obligatorios y el monto debe ser mayor a 0.')
      return
    }
    setLoading(true)
    const newExpense = {
      description: expenseName.trim(),
      amount: parseFloat(amount),
      categoryId,
      date: date,
      createdAt: new Date().toISOString()
    }
    try {
      await addDoc(collection(db, 'users', user.uid, 'expenses'), newExpense)
      dispatch(addExpense(newExpense))
      setLoading(false)
      navigate('/categories')
    } catch (err) {
      setError('Error al guardar el gasto en Firestore.')
      setLoading(false)
      console.error('Firestore error:', err)
    }
  }

  if (!user || !user.uid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-red-600 font-semibold mb-4">Debes iniciar sesión para registrar un gasto.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BotonInicio />
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Analizador de gastos</h1>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          CATEGORÍA: {currentCategory?.name}
        </h2>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="text-lg font-medium mb-2">Saldo actual:</p>
          <p className="text-2xl font-bold text-green-600">
            {currency} {balance.toFixed(2)}
          </p>
          <div className="mt-4 mb-4 h-40">
            <Pie data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del gasto:
            </label>
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carga el monto del gasto:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2">{currency}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carga la fecha del gasto:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Cargar'}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Saldo actualizado: {currency} {(balance - (amount ? parseFloat(amount) : 0)).toFixed(2)}
          </p>
        </form>
      </div>
    </div>
  )
}

export default ExpenseEntry