import React from 'react'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <KindeProvider
      clientId="a3f0cb1edb77441d931ecb74edfc37d2"
      domain="https://pokedex.kinde.com"
      redirectUri="http://localhost:5173"
      logoutUri="http://localhost:5173/login"
    >
      <App />

    </KindeProvider>
  </React.StrictMode>,
)


