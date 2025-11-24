function Auditorias() {
  const auditorias = [
    { 
      id: 1, 
      accion: 'ACTUALIZACIÓN', 
      accionColor: 'text-orange-600',
      responsable: 'JUAN JOSE', 
      entidad: 'PRACTICANTE',
      entidadColor: 'text-blue-700',
      fecha: '05 de septiembre del 2025',
      hora: 'Hora: 09:38 a. m.'
    },
    { 
      id: 2, 
      accion: 'INSERCCIÓN', 
      accionColor: 'text-green-600',
      responsable: 'MARÍA FERNANDA', 
      entidad: 'PRACTICANTE',
      entidadColor: 'text-blue-700',
      fecha: '05 de septiembre del 2025',
      hora: 'Hora: 09:38 a. m.'
    },
    { 
      id: 3, 
      accion: 'ACTUALIZACIÓN', 
      accionColor: 'text-orange-600',
      responsable: 'ENCARGADO 1', 
      entidad: 'PRACTICANTE',
      entidadColor: 'text-blue-700',
      fecha: '05 de septiembre del 2025',
      hora: 'Hora: 09:38 a. m.'
    },
    { 
      id: 4, 
      accion: 'ELIMINACIÓN', 
      accionColor: 'text-red-600',
      responsable: 'JUAN JOSE', 
      entidad: 'PRACTICANTE',
      entidadColor: 'text-blue-700',
      fecha: '05 de septiembre del 2025',
      hora: 'Hora: 09:38 a. m.'
    },
    { 
      id: 5, 
      accion: 'ACTUALIZACIÓN', 
      accionColor: 'text-orange-600',
      responsable: 'ADMINISTRADOR 2', 
      entidad: 'DEPARTAMENTO',
      entidadColor: 'text-blue-700',
      fecha: '05 de septiembre del 2025',
      hora: 'Hora: 09:38 a. m.'
    },
  ]

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        Home &gt; Auditorías
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
      </div>

      {/* Header */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-2 text-sm font-medium text-gray-700">Acción</div>
        <div className="col-span-3 text-sm font-medium text-gray-700">Responsable</div>
        <div className="col-span-3 text-sm font-medium text-gray-700">Entidad afectada</div>
        <div className="col-span-4 text-sm font-medium text-gray-700">Fecha y hora</div>
      </div>

      {/* Auditorias List */}
      <div className="space-y-4">
        {auditorias.map((auditoria) => (
          <div key={auditoria.id} className="bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2">
                <span className={`${auditoria.accionColor} text-sm font-semibold`}>
                  {auditoria.accion}
                </span>
              </div>
              <div className="col-span-3">
                <span className="text-sm text-gray-800">{auditoria.responsable}</span>
              </div>
              <div className="col-span-3">
                <span className={`${auditoria.entidadColor} text-sm font-semibold`}>
                  {auditoria.entidad}
                </span>
              </div>
              <div className="col-span-4">
                <div className="text-sm text-gray-800">
                  <div>{auditoria.fecha}</div>
                  <div>{auditoria.hora}</div>
                </div>
              </div>
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
    </div>
  )
}

export default Auditorias
