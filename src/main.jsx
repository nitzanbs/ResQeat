import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/UserContext';
import ThemeProvider from "./context/Theme";


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
     <ThemeProvider>
    <App />
    </ThemeProvider> 
      </UserProvider>
)
