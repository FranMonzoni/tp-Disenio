import React from 'react'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Balance Actual</h2>
            <p className="text-3xl font-bold text-green-600">$0.00</p>
          </div>
          
          {/* Gastos Recientes Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gastos Recientes</h2>
            <p className="text-gray-600">No hay gastos registrados</p>
          </div>
          
          {/* Categorías Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorías</h2>
            <p className="text-gray-600">No hay categorías creadas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard