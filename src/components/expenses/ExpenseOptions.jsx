import React from 'react'
import { Link } from 'react-router-dom'

function ExpenseOptions() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">¿Qué deseas hacer?</h1>
        
        <div className="space-y-4">
          <Link
            to="/select-category"
            className="block w-full p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">Selecciona la categoría del gasto</h2>
            <p className="mt-2 text-gray-600">Elige entre las categorías existentes para tu gasto</p>
          </Link>

          <Link
            to="/create-category"
            className="block w-full p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">Crea una categoría personal</h2>
            <p className="mt-2 text-gray-600">Personaliza tus propias categorías de gastos</p>
          </Link>

          <Link
            to="/rate-expense"
            className="block w-full p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">Califica tu futuro gasto</h2>
            <p className="mt-2 text-gray-600">Evalúa la importancia y necesidad de tu gasto</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExpenseOptions