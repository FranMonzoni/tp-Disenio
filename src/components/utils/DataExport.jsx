import React from 'react'
import { useSelector } from 'react-redux'

function DataExport() {
  const expenses = useSelector(state => state.expenses.expenses)
  const categories = useSelector(state => state.expenses.categories)
  const balance = useSelector(state => state.expenses.balance)

  const handleExport = () => {
    const data = {
      balance,
      categories,
      expenses,
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `expense-tracker-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Exportar Datos</h2>
      <p className="text-gray-600 mb-4">
        Descarga tus datos en formato JSON para hacer una copia de seguridad.
      </p>
      <button
        onClick={handleExport}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Exportar Datos
      </button>
    </div>
  )
}

export default DataExport