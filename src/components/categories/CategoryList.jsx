import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CategoryList() {
  const navigate = useNavigate()
  const { categories = [], customCategories = [] } = useSelector(state => state.expenses || {})

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'personalizados') {
      navigate('/create-category')
    } else {
      navigate(`/expense/${categoryId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Analizador de gastos</h1>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">CATEGORÍAS</h2>
        
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="w-full p-4 text-center text-gray-800 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {category.name}
            </button>
          ))}
          
          {customCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="w-full p-4 text-center text-gray-800 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList