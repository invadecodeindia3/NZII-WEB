// Entry point for the archived "Old" site (served under /old).
// Loaded dynamically from src/main.jsx so its global stylesheet never
// coexists with the current site's stylesheet.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
