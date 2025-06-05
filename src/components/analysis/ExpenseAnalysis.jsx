import React from 'react'
import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function ExpenseAnalysis() {
  const expenses = useSelector(state => state.expenses.expenses)
  const categories = useSelector(state => state.expenses.categories)

  // Preparar datos para el gráfico de gastos por categoría
  const expensesByCategory = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.categoryId === category.id)
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      category: category.name,
      total,
      color: category.color
    }
  })

  const pieChartData = {
    labels: expensesByCategory.map(item => item.category),
    datasets: [
      {
        data: expensesByCategory.map(item => item.total),
        backgroundColor: expensesByCategory.map(item => item.color),
      },
    ],
  }

  // Preparar datos para el gráfico de gastos por día
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  const expensesByDay = last7Days.map(day => {
    const dayExpenses = expenses.filter(expense => expense.date === day)
    return {
      day,
      total: dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    }
  })

  const barChartData = {
    labels: expensesByDay.map(item => new Date(item.day).toLocaleDateString()),
    datasets: [
      {
        label: 'Gastos Diarios',
        data: expensesByDay.map(item => item.total),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gastos de los Últimos 7 Días',
      },
    },
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Gastos por Categoría',
      },
    },
  }

  // Calcular estadísticas generales
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total de Gastos</h3>
          <p className="text-2xl font-bold text-indigo-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Gasto Promedio</h3>
          <p className="text-2xl font-bold text-indigo-600">${averageExpense.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Gasto Máximo</h3>
          <p className="text-2xl font-bold text-indigo-600">${maxExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <Pie options={pieChartOptions} data={pieChartData} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseAnalysis