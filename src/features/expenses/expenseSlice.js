import { createSlice } from '@reduxjs/toolkit'
import { defaultCategories } from './defaultCategories'

const initialState = {
  expenses: [],
  categories: defaultCategories,
  customCategories: [],
  balance: 0,
  currency: '',
  loading: false,
  error: null
}

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload.amount
      state.currency = action.payload.currency
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload)
      state.balance -= action.payload.amount
    },
    addCustomCategory: (state, action) => {
      state.customCategories.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setCustomCategories: (state, action) => {
      state.customCategories = action.payload
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload
    }
  }
})

export const { setBalance, addExpense, addCustomCategory, setLoading, setError, setCategories, setCustomCategories, setExpenses } = expenseSlice.actions
export default expenseSlice.reducer