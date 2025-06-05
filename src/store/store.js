import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import expenseReducer from '../features/expenses/expenseSlice'
import { loadState, localStorageMiddleware } from './localStorage'

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})