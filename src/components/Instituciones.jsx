import { useState } from 'react'
import arhiveIcon from '../assets/Arhive.svg'

function Instituciones() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showEliminarModal, setShowEliminarModal] = useState(false)
  const [showEditarModal, setShowEditarModal] = useState(false)
  const [showAgregarModal, setShowAgregarModal] = useState(false)
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null)
  const [nombreInstitucion, setNombreInstitucion] = useState('')
  const [telefonoInstitucion, setTelefonoInstitucion] = useState('')
  
  const instituciones = [
    { id: 1, name: 'UNIVERSIDAD POLITEC...', telefono: '(555) 346 6645', color: 'bg-yellow-100' },
    { id: 2, name: 'UNIVERSIDAD DEL CAR...', telefono: '(998) 168 6654', color: 'bg-green-200' },
    { id: 3, name: 'INSTITUTO POLITECNIC...', telefono: '(999) 854 6852', color: 'bg-purple-200' },
    { id: 4, name: 'UNIVERSIDAD ANAHUA...', telefono: '(991) 078 0657', color: 'bg-pink-200' },
    { id: 5, name: 'UNIVERSIDAD TECMILE...', telefono: '(996) 728 3652', color: 'bg-red-200' }
  ]

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home &gt; Instituciones
      </div>

      {/* Search and Action Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-full shadow-md px-6 py-3 flex items-center">
          <input 
            type="text" 
            placeholder="Buscar registro"
            className="flex-1 outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button className="bg-white rounded-full shadow-md px-6 py-3 flex items-center gap-2 text-gray-700 hover:bg-gray-50">
          <span>Filtros</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        <button 
          onClick={() => setShowAgregarModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md px-8 py-3 flex items-center gap-2 font-medium"
        >
          <span>Agregar</span>
          <img src={arhiveIcon} alt="Archive" className="w-5 h-5 brightness-0 invert" />
        </button>
      </div>

      {/* Table Header */}
      <div className="flex mb-4 px-4">
        <div className="flex-1 text-sm font-semibold text-gray-700">Nombre de la carrera</div>
        <div className="w-48 text-sm font-semibold text-gray-700">Telefono de la institución</div>
        <div className="w-24 text-sm font-semibold text-gray-700 text-right mr-8">Acciones</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {instituciones.map((institucion) => (
          <div key={institucion.id} className="bg-white rounded-2xl shadow-md p-6 flex items-center">
            {/* Name */}
            <div className="flex-1">
              <span className={`${institucion.color} px-6 py-2 rounded-full text-sm text-gray-800`}>
                {institucion.name}
              </span>
            </div>

            {/* Phone */}
            <div className="w-48">
              <span className="text-sm text-gray-800">{institucion.telefono}</span>
            </div>

            {/* Actions Column */}
            <div className="w-24 flex gap-3 justify-end">
              <button 
                onClick={() => {
                  setInstitucionSeleccionada(institucion)
                  setNombreInstitucion(institucion.name)
                  setTelefonoInstitucion(institucion.telefono)
                  setShowEditarModal(true)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  setInstitucionSeleccionada(institucion)
                  setShowEliminarModal(true)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">1</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">2</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">3</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">...</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">10</button>
      </div>

      {/* Modal de Eliminar Institución */}
      {showEliminarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Eliminar institución</h2>
            
            <p className="text-gray-700 mb-6">
              ¿Estas seguro que deseas eliminar esta institución?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí eliminarías la institución
                  console.log('Eliminar institución:', institucionSeleccionada)
                  setShowEliminarModal(false)
                  setInstitucionSeleccionada(null)
                }}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowEliminarModal(false)
                  setInstitucionSeleccionada(null)
                }}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Institución */}
      {showEditarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Editar la institución</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
                <input
                  type="text"
                  value={nombreInstitucion}
                  onChange={(e) => setNombreInstitucion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="UNIVERSIDAD POLITECNICA DE QUINTANA..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Tel:</label>
                <input
                  type="text"
                  value={telefonoInstitucion}
                  onChange={(e) => setTelefonoInstitucion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="(555) 346 6645"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí guardarías los cambios
                  console.log('Guardar institución:', { nombreInstitucion, telefonoInstitucion })
                  setShowEditarModal(false)
                  setInstitucionSeleccionada(null)
                  setNombreInstitucion('')
                  setTelefonoInstitucion('')
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowEditarModal(false)
                  setInstitucionSeleccionada(null)
                  setNombreInstitucion('')
                  setTelefonoInstitucion('')
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agregar Institución */}
      {showAgregarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Registrar a una nueva institución</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
                <input
                  type="text"
                  value={nombreInstitucion}
                  onChange={(e) => setNombreInstitucion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Nombre de la institución"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Tel:</label>
                <input
                  type="text"
                  value={telefonoInstitucion}
                  onChange={(e) => setTelefonoInstitucion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Teléfono"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí agregarías la nueva institución
                  console.log('Agregar institución:', { nombreInstitucion, telefonoInstitucion })
                  setShowAgregarModal(false)
                  setNombreInstitucion('')
                  setTelefonoInstitucion('')
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowAgregarModal(false)
                  setNombreInstitucion('')
                  setTelefonoInstitucion('')
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

export default Instituciones
