import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  expenses: [],
  categories: [],
  balance: 0,
  loading: false,
  error: null
}

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload)
      state.balance -= action.payload.amount
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setBalance, addExpense, addCategory, setLoading, setError } = expenseSlice.actions
export default expenseSlice.reducer