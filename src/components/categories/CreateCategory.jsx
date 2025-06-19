import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCustomCategory } from '../../features/expenses/expenseSlice'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import BotonInicio from '../BotonInicio'

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!categoryName.trim()) {
      setError('El nombre de la categoría es obligatorio')
      return
    }
    if (!user || !user.uid) {
      setError('Debes iniciar sesión para crear una categoría')
      return
    }
    setLoading(true)
    const newCategory = {
      id: `custom-${Date.now()}`,
      name: categoryName.trim().toUpperCase(),
      createdAt: new Date().toISOString()
    }
    try {
      await addDoc(collection(db, 'users', user.uid, 'customCategories'), newCategory)
      dispatch(addCustomCategory(newCategory))
      setLoading(false)
      navigate(`/expense/${newCategory.id}`)
    } catch (err) {
      setError('Error al guardar la categoría en Firestore')
      setLoading(false)
      console.error('Firestore error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <BotonInicio />
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Analizador de gastos</h1>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">CATEGORÍA: PERSONALIZADA</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la categoría a crear:
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Crear categoría'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCategory