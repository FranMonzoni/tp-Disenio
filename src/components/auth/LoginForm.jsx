import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.usuario.trim() || !formData.password.trim()) {
      setError('Todos los campos son obligatorios')
      return
    }
    setLoading(true)
    dispatch(loginStart())
    try {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const user = users.find(u => 
        u.usuario === formData.usuario && 
        u.password === formData.password
      )
      if (user && user.uid) {
        dispatch(loginSuccess(user))
        setLoading(false)
        navigate('/initial-balance')
      } else {
        dispatch(loginFailure('Credenciales inválidas'))
        setError('Usuario o contraseña incorrectos')
        setLoading(false)
      }
    } catch (error) {
      dispatch(loginFailure(error.message))
      setError('Error al iniciar sesión')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="usuario" className="sr-only">Usuario</label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
          <div className="text-center mt-4">
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              ¿No tienes cuenta? Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm