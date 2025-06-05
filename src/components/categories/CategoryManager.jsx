import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../features/expenses/expenseSlice'

function CategoryManager() {
  const [categoryName, setCategoryName] = useState('')
  const [categoryColor, setCategoryColor] = useState('#6366f1') // Color por defecto
  const dispatch = useDispatch()
  const categories = useSelector(state => state.expenses.categories)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (categoryName.trim()) {
      dispatch(addCategory({
        id: Date.now(),
        name: categoryName.trim(),
        color: categoryColor
      }))
      setCategoryName('')
      setCategoryColor('#6366f1')
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Gestionar Categorías</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="color"
            id="categoryColor"
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded-md"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Agregar Categoría
        </button>
      </form>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Categorías Existentes</h3>
        {categories.map(category => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryManager