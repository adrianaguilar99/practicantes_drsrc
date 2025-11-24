import { useState } from 'react'
import arhiveIcon from '../assets/Arhive.svg'

function Carreras() {
  const [showEliminarModal, setShowEliminarModal] = useState(false)
  const [showEditarModal, setShowEditarModal] = useState(false)
  const [showAgregarModal, setShowAgregarModal] = useState(false)
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null)
  const [nombreCarrera, setNombreCarrera] = useState('')

  const carreras = [
    { id: 1, nombre: 'ING. EN SOFTWARE', color: 'bg-yellow-100' },
    { id: 2, nombre: 'ING. BIOMEDICINA', color: 'bg-green-100' },
    { id: 3, nombre: 'ING. SISTEMAS', color: 'bg-pink-100' },
    { id: 4, nombre: 'LIC. ARQUITECTURA', color: 'bg-orange-100' },
    { id: 5, nombre: 'LIC. COCINA', color: 'bg-purple-100' },
  ]

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        Home &gt; Carreras
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar registro"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button className="px-6 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
        </button>
        <button 
          onClick={() => setShowAgregarModal(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
        >
          Agregar
          <img src={arhiveIcon} alt="Add" className="w-5 h-5 brightness-0 invert" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">Nombre de la carrera</div>
        <div className="text-sm font-medium text-gray-700 mr-8">Acciones</div>
      </div>

      {/* Carreras List */}
      <div className="space-y-4">
        {carreras.map((carrera) => (
          <div key={carrera.id} className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div>
              <span className={`${carrera.color} px-4 py-2 rounded-lg text-sm font-medium`}>
                {carrera.nombre}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button 
                onClick={() => {
                  setCarreraSeleccionada(carrera)
                  setNombreCarrera(carrera.nombre)
                  setShowEditarModal(true)
                }}
                className="text-gray-400 hover:text-blue-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  setCarreraSeleccionada(carrera)
                  setShowEliminarModal(true)
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button className="px-3 py-1 border border-gray-300 rounded">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded">2</button>
        <button className="px-3 py-1 border border-gray-300 rounded">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 border border-gray-300 rounded">10</button>
      </div>

      {/* Modal de Eliminar Carrera */}
      {showEliminarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Eliminar carrera</h2>
            
            <p className="text-gray-700 mb-6">
              ¿Estas seguro que deseas eliminar esta carrera?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí eliminarías la carrera
                  console.log('Eliminar carrera:', carreraSeleccionada)
                  setShowEliminarModal(false)
                  setCarreraSeleccionada(null)
                }}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowEliminarModal(false)
                  setCarreraSeleccionada(null)
                }}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Carrera */}
      {showEditarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Editar carrera</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
              <input
                type="text"
                value={nombreCarrera}
                onChange={(e) => setNombreCarrera(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="ING. EN SOFTWARE"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí guardarías los cambios
                  console.log('Guardar carrera:', nombreCarrera)
                  setShowEditarModal(false)
                  setCarreraSeleccionada(null)
                  setNombreCarrera('')
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowEditarModal(false)
                  setCarreraSeleccionada(null)
                  setNombreCarrera('')
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Carrera */}
      {showAgregarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Registrar a una nueva carrera</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
              <input
                type="text"
                value={nombreCarrera}
                onChange={(e) => setNombreCarrera(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Nombre de la carrera"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí agregarías la nueva carrera
                  console.log('Agregar carrera:', nombreCarrera)
                  setShowAgregarModal(false)
                  setNombreCarrera('')
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowAgregarModal(false)
                  setNombreCarrera('')
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carreras
