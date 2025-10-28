import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  users: User[]
}

const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@musicportal.com', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: '4', name: 'Mike Johnson', email: 'mike@example.com', role: 'user' },
  { id: '5', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin' },
  { id: '6', name: 'David Brown', email: 'david@example.com', role: 'user' },
  { id: '7', name: 'Lisa Davis', email: 'lisa@example.com', role: 'user' },
  { id: '8', name: 'Tom Miller', email: 'tom@example.com', role: 'user' },
  { id: '9', name: 'Emma Garcia', email: 'emma@example.com', role: 'user' },
  { id: '10', name: 'Chris Taylor', email: 'chris@example.com', role: 'admin' },
]

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  users: initialUsers,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(u => u.email === action.payload.email)
      if (user) {
        state.isAuthenticated = true
        state.user = user
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.users.push(newUser)
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
})

export const { login, logout, addUser, deleteUser } = authSlice.actions
export default authSlice.reducer