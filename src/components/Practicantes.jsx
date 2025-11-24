import { useState } from 'react'

function Practicantes({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const practicantes = [
    { 
      id: 1, 
      name: 'MARTIN MARTINEZ AREAS', 
      department: 'SISTEMAS', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      progress: 65
    },
    { 
      id: 2, 
      name: 'LEONARDO DANIEL REBOLLO CALERO', 
      department: 'SISTEMAS', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      progress: 43
    },
    { 
      id: 3, 
      name: 'ARMIN BORGES COB', 
      department: 'SISTEMAS', 
      type: 'INTERNO',
      typeColor: 'bg-[#BD9256]',
      progress: 100,
      completed: true
    },
    { 
      id: 4, 
      name: 'CRYSTIAN ADAMIR CARRERA RIVAS', 
      department: 'COCINA', 
      type: 'EXTERNO',
      typeColor: 'bg-[#3C5368]',
      progress: 87
    },
    { 
      id: 5, 
      name: 'YOSHUA RAYMUNDO MORENO ARREDONDO', 
      department: 'ENTRETENIMIENTO', 
      type: 'INTERNO',
      typeColor: 'bg-[#BD9256]',
      progress: 94
    }
  ]

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home &gt; Practicantes
      </div>

      {/* Search and Action Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-full shadow-md px-6 py-3 flex items-center">
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
        <button className="bg-white rounded-full shadow-md px-6 py-3 flex items-center gap-2 text-gray-700 hover:bg-gray-50">
          <span>Filtros</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md px-8 py-3 flex items-center gap-2 font-medium"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'agregar-practicante' }))}
        >
          <span>Agregar</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md px-8 py-3 flex items-center gap-2 font-medium">
          <span>Generar reporte</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 mb-4 px-4">
        <div className="col-span-2 text-sm font-semibold text-gray-700">Tipo de practicante</div>
        <div className="col-span-4 text-sm font-semibold text-gray-700">Practicante</div>
        <div className="col-span-3 text-sm font-semibold text-gray-700">Progreso</div>
        <div className="col-span-3 text-sm font-semibold text-gray-700">Acciones</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {practicantes.map((practicante) => (
          <div key={practicante.id} className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-12 gap-4 items-center">
            {/* Type Column */}
            <div className="col-span-2">
              <div className={`${practicante.typeColor} text-white text-center py-3 px-4 rounded-lg text-xs font-semibold leading-tight`}>
                <div>PRACTICANTE</div>
                <div>{practicante.type}</div>
              </div>
            </div>

            {/* Name Column */}
            <div className="col-span-4">
              <div className="font-semibold text-gray-800 text-sm">{practicante.name}</div>
              <div className="text-xs text-gray-600 mt-1">Departamento: {practicante.department}</div>
            </div>

            {/* Progress Column */}
            <div className="col-span-3">
              {practicante.completed ? (
                <div className="text-center">
                  <div className="text-green-600 font-semibold text-sm mb-2">¡completado!</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-right text-sm font-semibold text-gray-700 mb-2">{practicante.progress}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${practicante.progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Column */}
            <div className="col-span-3 flex gap-3 justify-center">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
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
    </div>
  )
}

export default Practicantes
