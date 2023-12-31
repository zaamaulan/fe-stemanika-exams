// AuthProvider.js
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from '../hooks/authReducer'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token') // Ambil token dari penyimpanan lokal
    const decodedToken = jwtDecode(token) // Anda perlu mendapatkan jwt_decode dari paket yang sesuai
    var userId = decodedToken.id
  }

  // console.log(userId);
  const login = (token) => {
    dispatch({ type: 'LOGIN', payload: token })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('token') // Hapus token dari localStorage saat logout
  }

  useEffect(() => {
    // Cek token saat komponen dimuat untuk memperbarui status otentikasi
    if (localStorage.getItem('token')) {
      login(localStorage.getItem('token'))
    }
  }, []) // [] sebagai dependensi untuk menjalankan efek hanya sekali saat komponen dimuat

  return <AuthContext.Provider value={{ ...state, login, logout, userId }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthContext, AuthProvider }
