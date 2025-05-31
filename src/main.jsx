import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from './Homepage.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Homepage />
    </ThemeProvider>
  </StrictMode>,
)
