import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginFailure } from '../../features/auth/authSlice'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { setBalance } from '../../features/expenses/expenseSlice'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    usuario: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validateForm = () => {
    if (!formData.email || !formData.usuario || !formData.password || !formData.confirmPassword) {
      throw new Error('Todos los campos son obligatorios')
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('El formato del email no es válido')
    }

    if (formData.usuario.length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
    }

    if (formData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Limpiar error al modificar el formulario
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      validateForm()
      
      // Obtener usuarios existentes o inicializar array
      const existingUsers = JSON.parse(localStorage.getItem('users')) || []
      
      // Verificar si el usuario ya existe
      if (existingUsers.some(user => user.usuario === formData.usuario)) {
        throw new Error('El nombre de usuario ya está en uso')
      }
      
      if (existingUsers.some(user => user.email === formData.email)) {
        throw new Error('El email ya está registrado')
      }

      // Crear nuevo usuario con uid
      const newUser = {
        uid: `uid-${Date.now()}`,
        id: Date.now(),
        email: formData.email,
        usuario: formData.usuario,
        password: formData.password,
        createdAt: new Date().toISOString()
      }
      
      // Guardar en localStorage
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]))
      
      // Actualizar estado de autenticación
      dispatch(loginSuccess(newUser))
      
      // Consultar saldo en Firestore
      const balanceRef = doc(db, 'users', newUser.uid, 'profile', 'balance')
      const balanceSnap = await getDoc(balanceRef)
      if (balanceSnap.exists()) {
        const { amount, currency, saldoInicial } = balanceSnap.data()
        dispatch(setBalance({ amount, currency, saldoInicial }))
        navigate('/inicio')
      } else {
        navigate('/initial-balance')
      }
    } catch (error) {
      console.error('Error en el registro:', error)
      dispatch(loginFailure(error.message))
      setError(error.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Registrate</h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="usuario" className="sr-only">Usuario</label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                required
                className="relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Registrarse
            </button>
          </div>
          <div className="text-center mt-4">
            <a
              href="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm