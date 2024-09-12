import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/login/login.page'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <LoginPage/>
  </StrictMode>,
)
