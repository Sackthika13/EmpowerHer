import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './GlobalStyles.css'
import EmpowerHerMain from './EmpowerHerMain.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmpowerHerMain />
  </StrictMode>,
)
