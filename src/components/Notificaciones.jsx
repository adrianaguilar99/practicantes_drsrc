function Notificaciones() {
  const notificaciones = [
    {
      id: 1,
      tipo: 'Asistencia',
      mensaje: 'Has registrado una entrada',
      fecha: '05 de septiembre a las 09:04 a. m.'
    },
    {
      id: 2,
      tipo: 'Asistencia',
      mensaje: 'Has registrado una salida',
      fecha: '04 de septiembre a las 17:05 p. m.'
    },
    {
      id: 3,
      tipo: 'Asistencia',
      mensaje: 'Has registrado una entrada',
      fecha: '04 de septiembre a las 09:10 a. m.'
    },
    {
      id: 4,
      tipo: 'Asistencia',
      mensaje: 'Has registrado una salida',
      fecha: '03 de septiembre a las 17:06 p. m.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-8">
          {/* Sidebar izquierdo */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-5xl font-bold">O</span>
              </div>
              <h2 className="text-center text-sm font-bold text-gray-800">
                OSCAR ADRIAN AGUILAR POOT
              </h2>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-800">NOTIFICACIONES</h1>
              </div>

              {/* Headers de columnas */}
              <div className="flex justify-between mb-4 px-4">
                <span className="text-sm font-semibold text-gray-700">TIPO DE NOTIFICACION</span>
                <span className="text-sm font-semibold text-gray-700">Fecha y hora</span>
              </div>

              {/* Lista de notificaciones */}
              <div className="space-y-4">
                {notificaciones.map((notif) => (
                  <div 
                    key={notif.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 mb-1">{notif.tipo}</p>
                        <p className="text-sm text-gray-600">{notif.mensaje}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{notif.fecha}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
