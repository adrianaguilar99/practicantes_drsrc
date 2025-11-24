import { useState } from 'react'
import dreamsLogo from '../assets/image.png'
import vectorIcon from '../assets/Vector.svg'
import userIcon from '../assets/User_alt.svg'
import mortarboardIcon from '../assets/Mortarboard.svg'
import signInIcon from '../assets/Sign_in_squre.svg'
import arhiveIcon from '../assets/Arhive.svg'
import bedIcon from '../assets/Bed.svg'
import bellIcon from '../assets/Bell_pin.svg'
import usuarioIcon from '../assets/usuario.svg'
import fileIcon from '../assets/File.svg'

function Layout({ children, currentView, onViewChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [practicantesOpen, setPracticantesOpen] = useState(false)
  const [supervisoresOpen, setSupervisoresOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="text-white text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <img src={dreamsLogo} alt="Dreams" className="h-8" />
        </div>
        <h1 className="text-lg font-medium">Supervisor RH DRSRC</h1>
        <div className="flex items-center gap-3">
          <button 
            className="text-white text-xl"
            onClick={() => onViewChange('notificaciones')}
          >
            <img src={bellIcon} alt="Notifications" className="w-6 h-6 cursor-pointer hover:opacity-80" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">ALONSO SOTO</span>
            <button onClick={() => onViewChange('mi-perfil')}>
              <img src={usuarioIcon} alt="User" className="w-10 h-10 cursor-pointer hover:opacity-80" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg flex flex-col py-6 transition-all duration-300`}>
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'home' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => onViewChange('home')}
          >
            <img src={vectorIcon} alt="Home" className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Casa</span>}
          </button>
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'supervisores' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => {
              setSupervisoresOpen(!supervisoresOpen)
              onViewChange('supervisores')
            }}
          >
            <img src={userIcon} alt="User" className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Supervisores</span>}
            {sidebarOpen && (
              <svg className={`w-4 h-4 ml-auto transition-transform ${supervisoresOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          {sidebarOpen && supervisoresOpen && (
            <div className="ml-8">
              <div className="h-10 flex items-center px-4 text-sm text-gray-600">
                Otros roles
              </div>
              <button 
                className="h-10 flex items-center px-4 text-sm text-gray-600 hover:text-blue-500 w-full"
                onClick={() => onViewChange('administradores')}
              >
                Administradores
              </button>
            </div>
          )}
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'practicantes' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => {
              setPracticantesOpen(!practicantesOpen)
              onViewChange('practicantes')
            }}
          >
            <img src={mortarboardIcon} alt="Education" className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Practicantes</span>}
            {sidebarOpen && (
              <svg className={`w-4 h-4 ml-auto transition-transform ${practicantesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          {sidebarOpen && practicantesOpen && (
            <div className="ml-8">
              <div className="h-10 flex items-center px-4 text-sm text-gray-600">
                Más opciones
              </div>
              <button 
                className="h-10 flex items-center px-4 text-sm text-gray-600 hover:text-blue-500 w-full"
                onClick={() => onViewChange('entradas-salidas')}
              >
                Entradas y salidas
              </button>
              <button 
                className="h-10 flex items-center px-4 text-sm text-gray-600 hover:text-blue-500 w-full"
                onClick={() => onViewChange('instituciones')}
              >
                Instituciones
              </button>
              <button 
                className="h-10 flex items-center px-4 text-sm text-gray-600 hover:text-blue-500 w-full"
                onClick={() => onViewChange('carreras')}
              >
                Carreras
              </button>
            </div>
          )}
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'departamentos' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => onViewChange('departamentos')}
          >
            <img src={arhiveIcon} alt="Archive" className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Departamentos</span>}
          </button>
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'propiedades' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => onViewChange('propiedades')}
          >
            <img src={bedIcon} alt="Bed" className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Propiedades</span>}
          </button>
          <button 
            className={`h-12 flex items-center px-4 gap-3 ${currentView === 'auditorias' ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => onViewChange('auditorias')}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {sidebarOpen && <span className="text-sm">Auditorías</span>}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
