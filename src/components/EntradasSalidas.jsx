import { useState } from 'react'

function EntradasSalidas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditarModal, setShowEditarModal] = useState(false)
  const [showReiniciarModal, setShowReiniciarModal] = useState(false)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null)
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSalida, setHoraSalida] = useState('')
  const [asistenciaTarde, setAsistenciaTarde] = useState(false)
  const [estadoAsistencia, setEstadoAsistencia] = useState('')
  
  const registros = [
    { 
      id: 1, 
      name: 'MARTIN MARTINEZ AREAS', 
      department: 'Sistemas', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      tipoAviso: 'ENTRADA NORMAL',
      avisoColor: 'text-green-600',
      fechaEntrada: '06/10/2025 09:00',
      fechaSalida: null
    },
    { 
      id: 2, 
      name: 'LEONARDO DANIEL REBOLLO CALERO', 
      department: 'Cocina', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      tipoAviso: 'ASISTENCIA CON SALIDA ANTICIPADA',
      avisoColor: 'text-yellow-600',
      fechaEntrada: '06/10/2025 09:00',
      fechaSalida: '06/10/2025 18:00',
      hasRefresh: true
    },
    { 
      id: 3, 
      name: 'CRYSTIAN ADAMIR CARRERA RIVAS', 
      department: 'Bodas', 
      type: 'INTERNO',
      typeColor: 'bg-[#BD9256]',
      tipoAviso: 'ASISTENCIA NORMAL',
      avisoColor: 'text-green-600',
      fechaEntrada: '06/10/2025 09:10',
      fechaSalida: '06/10/2025 16:50',
      separator: '5 de septiembre del 2024'
    },
    { 
      id: 4, 
      name: 'CRISTIAN ALBERTO CARRERA PUC', 
      department: 'AYB', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      tipoAviso: 'ASISTENCIA CON RETARDO',
      avisoColor: 'text-yellow-600',
      fechaEntrada: '06/10/2025 10:00',
      fechaSalida: '06/10/2025 17:00'
    },
    { 
      id: 5, 
      name: 'YOSHUA RAYMUNDO MORENO ...', 
      department: 'Concierge', 
      type: 'INTERNO',
      typeColor: 'bg-[#BD9256]',
      tipoAviso: 'ASISTENCIA NORMAL',
      avisoColor: 'text-green-600',
      fechaEntrada: '06/10/2025 09:00',
      fechaSalida: '06/10/2025 18:00'
    }
  ]

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home &gt; Entradas y salidas
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/3 bg-white rounded-full shadow-md px-6 py-3 flex items-center">
          <input 
            type="text" 
            placeholder="Buscar practicante..."
            className="flex-1 outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 px-4">
        <div className="col-span-3 text-sm font-semibold text-gray-700">Practicante</div>
        <div className="col-span-3 text-sm font-semibold text-gray-700">Tipo aviso</div>
        <div className="col-span-6 text-sm font-semibold text-gray-700">Fecha y hora</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {registros.map((registro) => (
          <div key={registro.id}>
            {registro.separator && (
              <div className="text-center text-sm text-gray-600 py-4 border-t border-b border-gray-300 my-4">
                {registro.separator}
              </div>
            )}
            <div 
              onClick={() => {
                setRegistroSeleccionado(registro)
                setHoraEntrada(registro.fechaEntrada?.split(' ')[1] || '')
                setHoraSalida(registro.fechaSalida?.split(' ')[1] || '')
                setAsistenciaTarde(registro.tipoAviso.includes('RETARDO'))
                setEstadoAsistencia('')
                setShowEditarModal(true)
              }}
              className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-12 gap-4 items-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              {/* Practicante Column */}
              <div className="col-span-3 flex items-start gap-3">
                <div className={`${registro.typeColor} text-white text-center py-2 px-3 rounded-lg text-xs font-semibold leading-tight flex-shrink-0`}>
                  <div>PRACTICANTE</div>
                  <div>{registro.type}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{registro.name}</div>
                  <div className="text-xs text-gray-600">Departamento: {registro.department}</div>
                </div>
              </div>

              {/* Tipo Aviso Column */}
              <div className="col-span-3">
                <span className={`${registro.avisoColor} text-sm font-semibold`}>
                  {registro.tipoAviso}
                </span>
              </div>

              {/* Fecha y Hora Column */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="text-sm text-gray-700">
                  <div>Entrada: {registro.fechaEntrada}</div>
                  {registro.fechaSalida && <div>Salida: {registro.fechaSalida}</div>}
                </div>
                {registro.hasRefresh && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setRegistroSeleccionado(registro)
                      setShowReiniciarModal(true)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>
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

      {/* Modal de Editar Registro de Asistencia */}
      {showEditarModal && registroSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Editar registro de asistencia</h2>
            
            <div className="space-y-4 mb-6">
              {/* Hora de entrada */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Hora de entrada:</label>
                <input
                  type="time"
                  value={horaEntrada}
                  onChange={(e) => setHoraEntrada(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Hora de salida */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Hora de salida:</label>
                <input
                  type="time"
                  value={horaSalida}
                  onChange={(e) => setHoraSalida(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Asistencia tarde */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Asistencia tarde:</label>
                <input
                  type="checkbox"
                  checked={asistenciaTarde}
                  onChange={(e) => setAsistenciaTarde(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 justify-self-start"
                />
              </div>

              {/* Estado de la asistencia */}
              <div className="grid grid-cols-2 gap-4 items-center">
                <label className="text-gray-700 font-medium">Estado de la asistencia:</label>
                <select
                  value={estadoAsistencia}
                  onChange={(e) => setEstadoAsistencia(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="normal">Asistencia normal</option>
                  <option value="retardo">Asistencia con retardo</option>
                  <option value="salida-anticipada">Asistencia con salida anticipada</option>
                  <option value="falta">Falta</option>
                </select>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí guardarías los cambios
                  console.log('Guardar asistencia:', { 
                    horaEntrada, 
                    horaSalida, 
                    asistenciaTarde, 
                    estadoAsistencia 
                  })
                  setShowEditarModal(false)
                  setRegistroSeleccionado(null)
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Aceptar
              </button>
              <button
                onClick={() => {
                  setShowEditarModal(false)
                  setRegistroSeleccionado(null)
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reiniciar Salida */}
      {showReiniciarModal && registroSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Reiniciar salida del practicante</h2>
            
            <p className="text-gray-700 mb-6">
              ¿Estas seguro que deseas reiniciar la salida de este practicante?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí reiniciarías la salida
                  console.log('Reiniciar salida del practicante:', registroSeleccionado)
                  setShowReiniciarModal(false)
                  setRegistroSeleccionado(null)
                }}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowReiniciarModal(false)
                  setRegistroSeleccionado(null)
                }}
                className="flex-1 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
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

export default EntradasSalidas
