import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBalance, setExpenses, setCustomCategories } from '../../features/expenses/expenseSlice'
import { db } from '../../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";

function InitialBalance() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('ARS')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    // Depuración: mostrar el usuario
    console.log('Usuario actual:', user);
    if (!user || !user.uid) {
      setLoading(false);
      setError('Debes iniciar sesión para cargar tu saldo.');
      return;
    }
    // Cargar gastos y categorías personalizadas
    const fetchData = async () => {
      try {
        const expensesSnap = await getDocs(collection(db, "users", user.uid, "expenses"));
        const expenses = expensesSnap.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            date: data.date && data.date.toDate ? data.date.toDate().toISOString() : data.date,
            createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
          };
        });
        dispatch(setExpenses(expenses));
        const customCatSnap = await getDocs(collection(db, "users", user.uid, "customCategories"));
        const customCategories = customCatSnap.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
          };
        });
        dispatch(setCustomCategories(customCategories));
        setLoading(false);
      } catch (err) {
        setError('Error al cargar datos de Firestore.');
        setLoading(false);
        console.error('Firestore error:', err);
      }
    };
    fetchData();
  }, [user, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !user.uid) {
      setError('Debes iniciar sesión para cargar tu saldo.');
      return;
    }
    if (amount > 0) {
      dispatch(setBalance({
        amount: parseFloat(amount),
        currency
      }))
      try {
        await addDoc(collection(db, "users", user.uid, "expenses"), {
          description: 'Initial Balance',
          amount: parseFloat(amount),
          categoryId: 'initial',
          date: new Date(),
          createdAt: new Date()
        })
        navigate('/categories')
      } catch (err) {
        setError('Error al guardar el saldo inicial en Firestore.');
        console.error('Firestore error:', err);
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-700">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded">Ir al login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">Carga tu saldo disponible</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Moneda</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="ARS">ARS - Peso Argentino</option>
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}

export default InitialBalance