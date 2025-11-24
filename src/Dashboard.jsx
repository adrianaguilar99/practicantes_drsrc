import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import Practicantes from './components/Practicantes'
import AgregarPracticante from './components/AgregarPracticanteModal'
import InformacionPracticante from './components/InformacionPracticante'
import GenerarCredencial from './components/GenerarCredencial'
import MiPerfil from './components/MiPerfil'
import InformacionPersonal from './components/InformacionPersonal'
import Notificaciones from './components/Notificaciones'
import Supervisores from './components/Supervisores'
import Departamentos from './components/Departamentos'
import Propiedades from './components/Propiedades'
import EntradasSalidas from './components/EntradasSalidas'
import Instituciones from './components/Instituciones'
import Carreras from './components/Carreras'
import Administradores from './components/Administradores'
import Auditorias from './components/Auditorias'

function Dashboard() {
  const [currentView, setCurrentView] = useState('home')

  useEffect(() => {
    const handleNavigate = (event) => {
      setCurrentView(event.detail)
    }
    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return <Home />
      case 'practicantes':
        return <Practicantes />
      case 'agregar-practicante':
        return <AgregarPracticante />
      case 'informacion-practicante':
        return <InformacionPracticante />
      case 'generar-credencial':
        return <GenerarCredencial />
      case 'mi-perfil':
        return <MiPerfil />
      case 'informacion-personal':
        return <InformacionPersonal />
      case 'notificaciones':
        return <Notificaciones />
      case 'supervisores':
        return <Supervisores />
      case 'administradores':
        return <Administradores />
      case 'departamentos':
        return <Departamentos />
      case 'propiedades':
        return <Propiedades />
      case 'entradas-salidas':
      case 'entradas':
        return <EntradasSalidas />
      case 'instituciones':
        return <Instituciones />
      case 'carreras':
        return <Carreras />
      case 'auditorias':
        return <Auditorias />
      default:
        return <Home />
    }
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  )
}

export default Dashboard
