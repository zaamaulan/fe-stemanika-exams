import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { UjianProvider } from './context/ujianContext.jsx'
import './index.css'
import { ResultProvider } from './context/scoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UjianProvider>
          <ResultProvider>
            <App />
          </ResultProvider>
        </UjianProvider>
      </AuthProvider>{' '}
    </HelmetProvider>
  </React.StrictMode>,
)
